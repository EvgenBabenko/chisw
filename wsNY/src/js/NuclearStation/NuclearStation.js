import { prevIndex } from '../utils';
import { checkActionCreator, powerOffActionCreator } from '../helpers/actionCreators';
import { setStatus, printMessage } from '../helpers/domHelpers';
import { constants } from '../constants';

class NuclearStation {
  constructor(API_HOST, domElements) {
    this.domElements = domElements;
    this.API_HOST = API_HOST;
    this.currentState = null;
    this.pulled = null;
    this.leversState = [false, false, false, false];
    this.isWrongLeversState = false;
    this.initTimer = null;
    this.timerDOM = null;
  }

  connect() {
    const { statusDom } = this.domElements;
    const { CONECTED } = constants;

    this.socket = new WebSocket(this.API_HOST);
    this.socket.onopen = () => setStatus(statusDom, CONECTED);
  }

  disconnect() {
    const { statusDom, messagesDom } = this.domElements;
    const { DISCONECTED } = constants;

    this.socket.close();

    setStatus(statusDom, DISCONECTED);
    printMessage(messagesDom, 'disconected');
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
    const { statusDom, messagesDom } = this.domElements;
    const { POWERED_ON, POWERED_OFF, DISCONECTED } = constants;

    if (newState === POWERED_ON) {
      this.isWrongLeversState = true;
    }

    if (newState === POWERED_OFF) {
      setStatus(statusDom, DISCONECTED);
      printMessage(messagesDom, `token: ${token}`);
      this.disconnect();
    }
  }

  _checkAction({ stateId, same }) {
    if (this.isWrongLeversState) {
      this._changeStateLever(this.pulled);
    } else {
      this.leversState[this.pulled] = same;
      this._changeStateLever(prevIndex(this.pulled));
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

  async _sendReq(req) {
    this.socket.send(JSON.stringify(req));
  }

  _updateTimer() {
    const { messagesDom } = this.domElements;
    const timer = (new Date() - this.initTimer) / 1000;
    const timerTemplate = `hacked system in ${timer}s`;

    if (this.timerDOM) {
      this.timerDOM.innerHTML = timerTemplate;
    } else {
      printMessage(messagesDom, timerTemplate, 'timer');
    }

    this.timerDOM = this.timerDOM || document.getElementById('timer');
  }
}

export default NuclearStation;
