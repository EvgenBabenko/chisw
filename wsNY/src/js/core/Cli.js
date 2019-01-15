import Observer from './Observer';

export default class CLI extends Observer {
  constructor(model) {
    super();

    this.model = model;
    this.formDom = document.getElementById('form');
    this.inputDom = document.getElementById('input');
    this.messagesDom = document.getElementById('messages');
    this.commands = null;
    this.commandsList = [];
    this.commandIndex = this.commandsList.length;
    this.enterCommandsList = false;

    this.model.subscribe((message, attr) => this.printMessage(message, attr));
    this.formDom.addEventListener('submit', this._handleSubmit.bind(this));
    this.formDom.addEventListener('keydown', this._handleKeyUp.bind(this));
  }

  initCommands(commands) {
    this.commands = commands;
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

  _prevCommand() {
    const index = this.commandIndex;

    this.enterCommandsList = true;
    this.commandIndex = index === 0 ? 0 : index - 1;

    this._printValue();
  }

  _nextCommand() {
    const index = this.commandIndex;
    const { length } = this.commandsList;

    this.commandIndex = index === length - 1 ? length - 1 : index + 1;

    this._printValue();
  }

  _printValue() {
    if (!this.commandsList[this.commandIndex]) {
      return;
    }

    this.inputDom.value = this.commandsList[this.commandIndex];
  }

  _addCommand(command) {
    if (command === this.commandsList[this.commandsList.length - 1]) {
      return;
    }

    this.commandsList.push(command);
    this.commandIndex = this.commandsList.length;
  }

  _updateScroll() {
    this.messagesDom.scrollTop = this.messagesDom.scrollHeight;
  }

  _handleSubmit(event) {
    event.preventDefault();

    this._addCommand(this.inputDom.value);

    this._parseUserInput(this.inputDom.value);

    this.inputDom.value = '';
  }

  _handleKeyUp({ code }) {
    const keyUpCommand = {
      ArrowUp: () => {
        this._prevCommand();
      },
      ArrowDown: () => {
        this._nextCommand();
      },
      Escape: () => {
        this.inputDom.value = '';
      },
    };

    if (keyUpCommand[code]) {
      keyUpCommand[code]();
    }
  }

  _parseUserInput(value) {
    const [command] = value.toLowerCase().trim().split(' ');

    if (this.commands[command]) {
      this.commands[command]();
    } else {
      this.printMessage('unknown command');
    }
  }
}
