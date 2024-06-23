const sharedInterfaceWebsocketServicesIndexGenerator = {
  type: 'add',
  path: 'src/shared/interface/websocket/services/index.ts',
  templateFile: 'plop-templates/shared/interface/websocket/services/index.hbs',
};

const websocketServicesGenerator = {
  type: 'add',
  path: 'src/shared/interface/websocket/services/event-emitter-service.ts',
  templateFile: 'plop-templates/shared/interface/websocket/services/event-emitter-service.hbs',
};

const sharedInterfaceWebsocketServicesFolderGenerator = [
  sharedInterfaceWebsocketServicesIndexGenerator,
  websocketServicesGenerator,
];

module.exports = {
  sharedInterfaceWebsocketServicesFolderGenerator,
  sharedInterfaceWebsocketServicesIndexGenerator,
  websocketServicesGenerator,
};
