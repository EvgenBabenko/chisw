import constants from '../constants';

const { CONNECTED, DISCONNECTED } = constants;

const statusColorMap = {
  [CONNECTED]: '#0F0',
  [DISCONNECTED]: 'red',
  default: 'white',
};

export default class MainView {
  constructor(model) {
    this.model = model;
    this.statusDom = document.getElementById('status');
  }

  setStatus(value = 'default') {
    this.statusDom.innerHTML = value;
    this.statusDom.style.color = statusColorMap[value];
  }
}
