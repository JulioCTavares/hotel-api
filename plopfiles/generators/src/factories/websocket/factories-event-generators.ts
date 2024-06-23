const sharedInterfaceWebsocketFactoriesIndexAppender = {
  type: 'append',
  path: 'src/domains/{{dashCase name}}/factories/websocket/index.ts',
  templateFile: 'plop-templates/domains/factories/websocket/index.hbs',
  abortOnFail: false,
  separator: '',
};

const sharedInterfaceWebsocketFactoriesIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/websocket/index.ts',
  templateFile: 'plop-templates/domains/factories/websocket/index.hbs',
  skipIfExists: true,
};

const eventWebsocketFactoryGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/websocket/event-{{dashCase feature}}-listener-factory.ts',
  templateFile: 'plop-templates/domains/factories/websocket/event-websocket-listener-factory.hbs',
};

const sharedInterfaceWebsocketFactoriesFolderGenerator = [
  sharedInterfaceWebsocketFactoriesIndexAppender,
  sharedInterfaceWebsocketFactoriesIndexGenerator,
  eventWebsocketFactoryGenerator,
];

module.exports = {
  eventWebsocketFactoryGenerator,
  sharedInterfaceWebsocketFactoriesIndexAppender,
  sharedInterfaceWebsocketFactoriesIndexGenerator,
  sharedInterfaceWebsocketFactoriesFolderGenerator,
};
