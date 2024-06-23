const { mainInfraWebsocketFolderGenerator: socketMainInfraFactory } = require('../generators/src/main/infra/websocket/websocket-generators.ts');

const { sharedInfraWebsocketAdaptersFolderGenerator: socketSharedInfraAdaptersFactory } = require('../generators/src/shared/infra/websocket/adapters-generators.ts');
const { sharedInfraWebsocketServicesFolderGenerator: socketSharedInfraServiceFactory } = require('../generators/src/shared/infra/websocket/service-generators.ts');

const { sharedInterfaceWebsocketProtocolsFolderGenerator: socketSharedInterfaceProtocolsFactory } = require('../generators/src/shared/interface/websocket/protocols-generators.ts');
const { sharedInterfaceWebsocketServicesFolderGenerator: socketSharedInterfaceServicesFactory } = require('../generators/src/shared/interface/websocket/services-generators.ts');

const createWebsocketSetupAction = [
  ...socketMainInfraFactory,
  ...socketSharedInfraAdaptersFactory,
  ...socketSharedInfraServiceFactory,
  ...socketSharedInterfaceProtocolsFactory,
  ...socketSharedInterfaceServicesFactory,
];

module.exports = {
  createWebsocketSetupAction,
};
