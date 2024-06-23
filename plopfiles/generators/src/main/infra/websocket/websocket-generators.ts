const mainInfraWebsocketIndexGenerator = {
  type: 'add',
  path: 'src/main/infra/websocket/index.ts',
  templateFile: 'plop-templates/main/infra/websocket/index.hbs',
};

const mainInfraWebsocketExceptionGenerator = {
  type: 'add',
  path: 'src/main/infra/websocket/socket-exception.ts',
  templateFile: 'plop-templates/main/infra/websocket/socket-exception.hbs',
};

const mainInfraWebsocketListenersGenerator = {
  type: 'add',
  path: 'src/main/infra/websocket/socket-listeners.ts',
  templateFile: 'plop-templates/main/infra/websocket/socket-listeners.hbs',
};

const mainInfraWebsocketServerGenerator = {
  type: 'add',
  path: 'src/main/infra/websocket/socket-server.ts',
  templateFile: 'plop-templates/main/infra/websocket/socket-server.hbs',
};

const mainInfraWebsocketFolderGenerator = [
  mainInfraWebsocketIndexGenerator,
  mainInfraWebsocketExceptionGenerator,
  mainInfraWebsocketListenersGenerator,
  mainInfraWebsocketServerGenerator,
];

module.exports = {
  mainInfraWebsocketFolderGenerator,
  mainInfraWebsocketIndexGenerator,
  mainInfraWebsocketExceptionGenerator,
  mainInfraWebsocketListenersGenerator,
  mainInfraWebsocketServerGenerator,
};
