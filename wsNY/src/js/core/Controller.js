import config from '../../config';

const HOST = config.API_HOST;

export default class Controller {
  constructor(model, cli) {
    this.model = model;
    this.cli = cli;

    this.initCommands();
  }

  initCommands() {
    const connectServer = async () => {
      await this.model.open(HOST);
    };

    const closeServer = async () => {
      await this.model.close();
    };

    const hackSystem = () => {
      const { connectionStatus, isMessaging } = this.model.getStatus();

      if (isMessaging) {
        return;
      }

      if (!connectionStatus) {
        this.cli.printMessage('No server connection');

        return;
      }

      this.cli.printMessage('Start shootdown system');

      this.model.message();
    };

    const clearAll = () => {
      this.cli.clearAll();
    };

    const reloadServer = async () => {
      const { connectionStatus } = this.model.getStatus();

      if (connectionStatus) {
        await closeServer();
      }

      clearAll();

      await connectServer();
    };

    const commands = {
      connect: async () => {
        await connectServer();
      },
      close: async () => {
        await closeServer();
      },
      hack: () => hackSystem(),
      reload: async () => {
        await reloadServer();
      },
      clear: () => clearAll(),
    };

    return this.cli.initCommands(commands);
  }
}
