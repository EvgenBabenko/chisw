import { prevIndex } from '../utils';
import { checkActionCreator, powerOffActionCreator } from '../helpers/actionCreators';
import { setStatus, printMessage } from '../helpers/domHelpers';
import { constants } from '../constants';

class Matrix {
  constructor(API_HOST, DOMElements) {
    this.status = DOMElements.status;
    this.messages = DOMElements.messages;
    this.API_HOST = API_HOST;
    this.socket = null;
    this.currentState = null;
    this.pulled = null;
    this.stateId = null;
    this.leversState = [null, null, null, null];
    this.isReversed = false;
    this.startDate = null;
    this.timer = null;
  }

  connect() {
    this.socket = new WebSocket(this.API_HOST);
    this.socket.onopen = () => setStatus(this.status, constants.CONECTED);
  }

  disconnect() {
    this.socket.onclose = () => {
      setStatus(this.status, constants.DISCONECTED);
      printMessage(this.messages, 'disconected');
    };
  }

  message() {
    this.socket.onmessage = (res) => {
      this.startDate = this.startDate || new Date();
      console.log('res', JSON.parse(res.data));

      this.currentState = JSON.parse(res.data);

      const {
        action,
        same,
        token,
        newState,
        stateId,
      } = this.currentState;

      this.pulled = this.currentState.pulled === 0
        ? this.currentState.pulled
        : this.currentState.pulled || this.pulled;

      console.log(this.leversState, this.currentState, this.pulled, stateId, newState);

      if (newState) {
        if (newState === constants.poweredOn) {
          this.leversState = [1, 1, 1, 1];
          this.isReversed = true;

          return;
        }

        if (newState === constants.poweredOff) {
          setStatus(this.status, constants.DISCONECTED);
          printMessage(this.messages, `token: ${token}`);
          this.socket.close();

          return;
        }
      }

      if (action) {
        const prevLeverIndex = prevIndex(this.pulled);

        if (this.isReversed) {
          this.leversState[this.pulled] = !this.leversState[this.pulled];

          if (this.leversState.every(leverState => !leverState)) {
            this.socket.send(JSON.stringify(powerOffActionCreator(stateId)));
          }

          return;
        }

        this.leversState[this.pulled] = same;

        if (this.leversState[prevLeverIndex] !== null) {
          this.leversState[prevLeverIndex] = !this.leversState[prevLeverIndex];
        }

        if (this.leversState.every(leverState => leverState)) {
          this.socket.send(JSON.stringify(powerOffActionCreator(stateId)));
        }
      } else {
        this.pulled = this.currentState.pulled;
        this.socket.send(JSON.stringify(checkActionCreator(stateId, this.pulled)));
      }

      const timer = (new Date() - this.startDate) / 1000;
      const timerTemplate = `hacked system in ${timer}s`;

      if (this.timer) {
        this.timer.innerHTML = timerTemplate;
      } else {
        printMessage(this.messages, timerTemplate, 'timer');
      }

      this.timer = this.timer || document.getElementById('timer');
    };
  }
}

export default Matrix;
