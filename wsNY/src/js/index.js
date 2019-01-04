import config from '../config';
import Matrix from './Matrix/Matrix';
import { printMessage } from './helpers/domHelpers';
import { constants } from './constants';

const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const DOMElements = {
  status,
  messages,
};

let isConnecting = false;

const matrix = new Matrix(config.API_HOST, DOMElements);

const connect = async () => {
  printMessage(messages, `Connecting to server ${config.API_HOST}...`);

  matrix.connect();
  isConnecting = true;
};

const hack = async () => {
  if (!isConnecting) {
    printMessage(messages, 'no server connection');

    return;
  }

  printMessage(messages, 'start hacking system');
  matrix.message();
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (input.value === constants.connect) {
    await connect();
  } else if (input.value === constants.hack) {
    hack();
  } else {
    printMessage(messages, 'unknown command');
  }

  input.value = '';
});
