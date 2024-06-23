const sharedInterfaceWebsocketControllersIndexGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase name}}/interface/controllers/index.ts',
  templateFile: 'plop-templates/domains/interface/controllers/controller-listener-index.hbs',
  separator: '',
};

const websocketControllerGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/controllers/{{dashCase feature}}-controller.ts',
  templateFile: 'plop-templates/domains/interface/controllers/websocket-controller.hbs',
};

const sharedInterfaceWebsocketControllersFolderGenerator = [
  sharedInterfaceWebsocketControllersIndexGenerator,
  websocketControllerGenerator,
];

module.exports = {
  sharedInterfaceWebsocketControllersFolderGenerator,
  sharedInterfaceWebsocketControllersIndexGenerator,
  websocketControllerGenerator,
};
