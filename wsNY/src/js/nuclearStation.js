import { prevIndex } from './utils';
import { checkActionCreator, powerOffActionCreator } from './helpers/actionCreators';
import { setStatus } from './helpers/domHelpers';
import { constants } from './constants';
import config from '../config';

const {
  CONECTED, DISCONECTED, POWERED_ON, POWERED_OFF,
} = constants;
const { LEVERS_LENGTH } = config;

class NuclearStation {
  constructor(statusDom, cli) {
    this.statusDom = statusDom;
    this.cli = cli;
    this.pulled = null;
    this.leversState = Array.from({ length: LEVERS_LENGTH }, (v, k) => k).fill(false);
    this.isWrongLeversState = false;
    this.initTimer = null;
    this.timerDOM = null;
  }

  connect(API_HOST) {
    this.socket = new WebSocket(API_HOST);
    this.socket.onopen = () => setStatus(this.statusDom, CONECTED);
  }

  disconnect() {
    this.socket.close();

    setStatus(this.statusDom, DISCONECTED);
    this.cli.printMessage('disconected');
  }

  message() {
    this.socket.onmessage = (res) => {
      this.initTimer = this.initTimer || new Date();

      this._getToken(JSON.parse(res.data));

      this._updateTimer();
    };
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
      this._sendReq(checkActionCreator(stateId, this.pulled));
    }
  }

  _checkNewState({ token, newState }) {
    if (newState === POWERED_ON) {
      this.isWrongLeversState = true;
    }

    if (newState === POWERED_OFF) {
      setStatus(this.statusDom, DISCONECTED);
      this.cli.printMessage(`token: ${token}`);
      this.disconnect();
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
      this._sendReq(powerOffActionCreator(stateId));
    }
  }

  _sendReq(req) {
    this.socket.send(JSON.stringify(req));
  }

  _updateTimer() {
    const timer = (new Date() - this.initTimer) / 1000;
    const timerTemplate = `hacked system in ${timer}s`;

    if (this.timerDOM) {
      this.timerDOM.innerHTML = timerTemplate;
    } else {
      this.cli.printMessage(timerTemplate, 'timer');
    }

    this.timerDOM = this.timerDOM || document.getElementById('timer');
  }
}

export default NuclearStation;
