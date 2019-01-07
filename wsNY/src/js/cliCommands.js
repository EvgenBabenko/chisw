export default (cli, nuclearStation) => {
  const connectServer = () => {
    if (isConnecting) {
      cli.printMessage('Station already running');

      return;
    }

    cli.printMessage(`Connecting to station ${HOST}...`);

    nuclearStation.connect(HOST);

    isConnecting = true;
  };

  const closeServer = () => {
    isConnecting = false;
    nuclearStation.disconnect(cli);
  };

  const hackSystem = () => {
    if (!isConnecting) {
      cli.printMessage('no station connection');

      return;
    }

    cli.printMessage('start shootdown system');

    nuclearStation.message(cli);
  };

  const clearAll = () => {
    cli.clearAll();
  };

  const reloadServer = () => {
    if (statusDom.innerText === constants.CONECTED) {
      closeServer();
    }

    clearAll();

    connectServer();
  };

  return {
    connect: () => connectServer(),
    close: () => closeServer(),
    hack: () => hackSystem(),
    reload: () => reloadServer(),
    clear: () => clearAll(),
  };
};
