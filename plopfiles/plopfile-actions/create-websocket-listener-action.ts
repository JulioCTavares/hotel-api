const fs = require('fs');

const {
  sharedInterfaceWebsocketControllersFolderGenerator: socketSharedInterfaceControllersFactory
} = require('../generators/src/interface/controllers/event-controllers-generators.ts');

const {
  websocketEventAppender: appendNewEventIntoListeners,
  websocketEventsGenerator: generateDefaultEventListenerFile,
  websocketEventImportAppender: appendNewImportIntoListenerModule,
  sharedInfraWebsocketEventsIndexGenerator: generateDefaultExportFileForListeners,
  sharedInfraWebsocketEventsFolderGenerator: socketSharedInfraEventsFactory,
} = require('../generators/src/infra/websocket/events-generators.ts');
const {
  websocketEventListenerGenerator: generateDefaultListenerInterfaceFile,
  sharedInterfaceWebsocketListenersIndexAppender: appendNewImportIntoInterface,
  sharedInterfaceWebsocketListenersIndexGenerator: generateDefaultExportFileForListenerInterface,
} = require('../generators/src/interface/websocket/event-listener-generators.ts');
const {
  eventWebsocketFactoryGenerator: generateDefaultFactoryFile,
  sharedInterfaceWebsocketFactoriesIndexAppender: appendNewFactoryExportIntoIndex,
  sharedInterfaceWebsocketFactoriesIndexGenerator: generateDefaultExportFileForFactories,
} = require('../generators/src/factories/websocket/factories-event-generators.ts');

const createWebsocketListenerAction = (data) => {
  const actions = [
    socketSharedInterfaceControllersFactory,
    // socketSharedInterfaceListenersFactory,
    // socketSharedInterfaceFactoriesFactory,
  ];

  // handle with infra
  const isInfraIndex = fs.existsSync(`./src/domains/${data.name}/infra/websocket/index.ts`);
  if (isInfraIndex) {
    actions.push(appendNewEventIntoListeners);
    actions.push(appendNewImportIntoListenerModule);
  } else {
    actions.push(generateDefaultExportFileForListeners);
    actions.push(generateDefaultEventListenerFile);
  }

  // handle with interface
  const isControllerIndex = fs.existsSync(`./src/domains/${data.name}/interface/websocket/index.ts`);
  actions.push(generateDefaultListenerInterfaceFile);
  if (isControllerIndex) actions.push(appendNewImportIntoInterface);
  else actions.push(generateDefaultExportFileForListenerInterface);

  // handle with factories
  const isFactoryIndex = fs.existsSync(`./src/domains/${data.name}/factories/websocket/index.ts`);
  actions.push(generateDefaultFactoryFile);
  if (isFactoryIndex) actions.push(appendNewFactoryExportIntoIndex);
  else actions.push(generateDefaultExportFileForFactories);

  return actions.flat();
}

module.exports = {
  createWebsocketListenerAction,
};
