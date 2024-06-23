const sharedInterfaceWebsocketListenersIndexAppender = {
  type: 'append',
  path: 'src/domains/{{dashCase name}}/interface/websocket/index.ts',
  templateFile: 'plop-templates/domains/interface/websocket/event-listener-index.hbs',
  abortOnFail: false,
  separator: '',
};

const sharedInterfaceWebsocketListenersIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/websocket/index.ts',
  templateFile: 'plop-templates/domains/interface/websocket/event-listener-index.hbs',
  skipIfExists: true,
};

const websocketEventListenerGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/websocket/event-{{dashCase feature}}-listener.ts',
  templateFile: 'plop-templates/domains/interface/websocket/event-websocket-listener.hbs',
};

const sharedInterfaceWebsocketListenersFolderGenerator = [
  sharedInterfaceWebsocketListenersIndexAppender,
  sharedInterfaceWebsocketListenersIndexGenerator,
  websocketEventListenerGenerator,
];

module.exports = {
  websocketEventListenerGenerator,
  sharedInterfaceWebsocketListenersIndexAppender,
  sharedInterfaceWebsocketListenersIndexGenerator,
  sharedInterfaceWebsocketListenersFolderGenerator,
};
