const sharedInfraWebsocketServicesIndexGenerator = {
  type: 'add',
  path: 'src/shared/infra/websocket/services/index.ts',
  templateFile: 'plop-templates/shared/infra/websocket/services/index.hbs',
};

const socketEventEmitterServiceGenerator = {
  type: 'add',
  path: 'src/shared/infra/websocket/services/socket-event-emitter.service.ts',
  templateFile: 'plop-templates/shared/infra/websocket/services/socket-event-emitter.service.hbs',
};

const sharedInfraWebsocketServicesFolderGenerator = [
  sharedInfraWebsocketServicesIndexGenerator,
  socketEventEmitterServiceGenerator,
];

module.exports = {
  sharedInfraWebsocketServicesFolderGenerator,
  sharedInfraWebsocketServicesIndexGenerator,
  socketEventEmitterServiceGenerator,
};
