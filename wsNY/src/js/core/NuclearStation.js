import WebSocketAsPromised from 'websocket-as-promised';

import Observer from './Observer';
import MainView from './MainView';
import { prevIndex } from '../utils/changeIndex';
import { checkActionCreator, powerOffActionCreator } from '../helpers/actionCreators';
import constants from '../constants';
import config from '../../config';

const {
  POWERED_ON,
  POWERED_OFF,
  CONNECTED,
  DISCONNECTED,
} = constants;
const { LEVERS_LENGTH } = config;
const mainView = new MainView();

export default class WsApi extends Observer {
  constructor() {
    super();

    this.socket = null;
    this.connectionStatus = false;
    this.isMessaging = false;
    this.leversState = Array.from({ length: LEVERS_LENGTH }, (v, k) => k).fill(false);
    this.pulled = null;
    this.isWrongLeversState = false;
    this.initTimer = null;
    this.timerDOM = null;
  }

  async open(API_HOST) {
    this.initTimer = null;

    if (this.connectionStatus) {
      this.notify('Server is already running');

      return;
    }

    this.notify(`Connecting to server ${API_HOST}...`);

    this.socket = new WebSocketAsPromised(API_HOST);

    try {
      await this.socket.open();

      this.notify('Connection is successful');
      this.connectionStatus = true;
      mainView.setStatus(CONNECTED);
    } catch (err) {
      this.notify(`Connecting has error: ${err}`);
    }
  }

  async close() {
    this.isMessaging = false;

    if (!this.connectionStatus) {
      this.notify('Server is not working');

      return;
    }

    await this.socket.close();

    this.notify('Server disconnected');
    this.connectionStatus = false;
    mainView.setStatus(DISCONNECTED);
  }

  message() {
    this.isMessaging = true;

    this.socket.onMessage.addListener((res) => {
      console.log(JSON.parse(res));
      this.initTimer = this.initTimer || new Date();

      this._getToken(JSON.parse(res));

      this._updateTimer();
    });
  }

  getStatus() {
    return {
      connectionStatus: this.connectionStatus,
      isMessaging: this.isMessaging,
    };
  }

  _send(req) {
    this.socket.send(JSON.stringify(req));
  }

  _getToken(currentState) {
    const {
      action,
      newState,
      stateId,
      pulled,
    } = currentState;

    this.pulled = typeof (pulled) === 'number' ? pulled : this.pulled;

    console.log(this.leversState, currentState);

    if (newState) {
      this._checkNewState(currentState);

      return;
    }

    if (action) {
      this._checkAction(currentState);
    } else {
      this._send(checkActionCreator(stateId, this.pulled));
    }
  }

  _checkNewState({ token, newState }) {
    if (newState === POWERED_ON) {
      this.isWrongLeversState = true;
    }

    if (newState === POWERED_OFF) {
      this.notify(`token: ${token}`); // cli
      this.close();
    }
  }

  _checkAction({ stateId, same }) {
    if (this.isWrongLeversState) {
      this._changeStateLever(this.pulled);
    } else {
      this.leversState[this.pulled] = same;
      this._changeStateLever(prevIndex(this.pulled, LEVERS_LENGTH));
    }

    this._checkPowerOff(stateId);
  }

  _changeStateLever(index) {
    this.leversState[index] = !this.leversState[index];
  }

  _checkPowerOff(stateId) {
    if (this.leversState.every(leverState => leverState !== this.isWrongLeversState)) {
      this._send(powerOffActionCreator(stateId));
    }
  }

  _updateTimer() {
    const timer = (new Date() - this.initTimer) / 1000;
    const timerTemplate = `hacked system in ${timer}s`;

    if (this.timerDOM) {
      this.timerDOM.innerHTML = timerTemplate;
    } else {
      this.notify(timerTemplate, 'timer'); // cli
    }

    this.timerDOM = this.timerDOM || document.getElementById('timer');
  }
}
