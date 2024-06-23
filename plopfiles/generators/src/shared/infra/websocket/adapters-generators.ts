const sharedInfraWebsocketAdaptersIndexGenerator = {
  type: 'add',
  path: 'src/shared/infra/websocket/adapters/index.ts',
  templateFile: 'plop-templates/shared/infra/websocket/adapters/index.hbs',
};

const socketListenerAdapterGenerator = {
  type: 'add',
  path: 'src/shared/infra/websocket/adapters/socket-listener-adapter.ts',
  templateFile: 'plop-templates/shared/infra/websocket/adapters/socket-listener-adapter.hbs',
};

const sharedInfraWebsocketAdaptersFolderGenerator = [
  sharedInfraWebsocketAdaptersIndexGenerator,
  socketListenerAdapterGenerator,
];

module.exports = {
  sharedInfraWebsocketAdaptersFolderGenerator,
  sharedInfraWebsocketAdaptersIndexGenerator,
  socketListenerAdapterGenerator,
};
