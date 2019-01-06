import config from '../config';
import NuclearStation from './NuclearStation/NuclearStation';
import { printMessage } from './helpers/domHelpers';

const statusDom = document.getElementById('status');
const messagesDom = document.getElementById('messages');
const formDom = document.getElementById('form');
const inputDom = document.getElementById('input');

const domElements = {
  statusDom,
  messagesDom,
};

let isConnecting = false;

const host = config.API_HOST;

const nuclearStation = new NuclearStation(host, domElements);

const connectServer = () => {
  if (isConnecting) {
    printMessage(messagesDom, 'Station already running');

    return;
  }

  printMessage(messagesDom, `Connecting to station ${host}...`);

  nuclearStation.connect();

  isConnecting = true;
};

const hackSystem = () => {
  if (!isConnecting) {
    printMessage(messagesDom, 'no station connection');

    return;
  }

  printMessage(messagesDom, 'start shootdown system');

  nuclearStation.message();
};

formDom.addEventListener('submit', (event) => {
  event.preventDefault();

  if (inputDom.value === 'connect') {
    connectServer();
  } else if (inputDom.value === 'hack') {
    hackSystem();
  } else {
    printMessage(messagesDom, 'unknown command');
  }

  inputDom.value = '';
});
