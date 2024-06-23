const sharedInterfaceWebsocketProtocolsIndexGenerator = {
  type: 'add',
  path: 'src/shared/interface/websocket/protocols/index.ts',
  templateFile: 'plop-templates/shared/interface/websocket/protocols/index.hbs',
};

const eventListenerProtocolsGenerator = {
  type: 'add',
  path: 'src/shared/interface/websocket/protocols/event-listener.ts',
  templateFile: 'plop-templates/shared/interface/websocket/protocols/event-listener.hbs',
};

const sharedInterfaceWebsocketProtocolsFolderGenerator = [
  sharedInterfaceWebsocketProtocolsIndexGenerator,
  eventListenerProtocolsGenerator,
];

module.exports = {
  sharedInterfaceWebsocketProtocolsFolderGenerator,
  sharedInterfaceWebsocketProtocolsIndexGenerator,
  eventListenerProtocolsGenerator,
};
