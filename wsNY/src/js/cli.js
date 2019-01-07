/* eslint-disable no-param-reassign */
function getKeyUpCommand(node) {
  return ({
    ArrowUp: () => {
      this.prevCommand();
      node.value = this.commandsList[this.commandIndex];
    },
    ArrowDown: () => {
      this.nextCommand();
      node.value = this.commandsList[this.commandIndex];
    },
    Escape: () => {
      node.value = '';
    },
  });
}

class CLI {
  constructor() {
    this.formDom = document.getElementById('form');
    this.inputDom = document.getElementById('input');
    this.messagesDom = document.getElementById('messages');
    this.commands = null;
    this.commandsList = [];
    this.commandIndex = null;
  }

  init(commands) {
    this.commands = commands;

    this.formDom.addEventListener('submit', this.handleSubmit.bind(this));
    this.formDom.addEventListener('keydown', this.handleKeyUp.bind(this));
  }

  prevCommand() {
    const index = this.commandIndex;

    this.commandIndex = index === 0 ? 0 : index - 1;
  }

  nextCommand() {
    const index = this.commandIndex;
    const { length } = this.commandsList;

    this.commandIndex = index === length - 1 ? length - 1 : index + 1;
  }

  addCommand(command) {
    this.commandsList.push(command);
    this.commandIndex = this.commandsList.length;
  }

  printMessage(value, idAttr) {
    const li = document.createElement('li');

    if (idAttr) {
      li.id = idAttr;
    }

    li.innerHTML = value;
    this.messagesDom.appendChild(li);

    this._updateScroll();
  }

  clearAll() {
    this.messagesDom.innerHTML = '';
  }

  _updateScroll() {
    this.messagesDom.scrollTop = this.messagesDom.scrollHeight;
  }

  handleSubmit(event) {
    event.preventDefault();

    this.addCommand(this.inputDom.value);

    this.parseUserInput(this.inputDom.value);

    this.inputDom.value = '';
  }

  handleKeyUp({ code }) {
    const keyUpCommand = getKeyUpCommand.call(this, this.inputDom);

    if (keyUpCommand[code]) {
      keyUpCommand[code]();
    }
  }

  parseUserInput(value) {
    const [command] = value.toLowerCase().trim().split(' ');

    if (this.commands[command]) {
      this.commands[command]();
    } else {
      this.printMessage('unknown command');
    }
  }
}

export default CLI;
