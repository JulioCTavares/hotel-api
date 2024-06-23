const websocketEventAppender = {
  type: 'append',
  path: 'src/domains/{{dashCase name}}/infra/websocket/{{dashCase name}}-event-listeners.ts',
  templateFile: 'plop-templates/domains/infra/websocket/websocket-event-append.hbs',
  abortOnFail: false,
  pattern: '=> {',
};

const websocketEventImportAppender = {
  type: 'append',
  path: 'src/domains/{{dashCase name}}/infra/websocket/{{dashCase name}}-event-listeners.ts',
  templateFile: 'plop-templates/domains/infra/websocket/websocket-event-import-append.hbs',
  abortOnFail: false,
  pattern: `@/shared/infra/websocket/adapters';\n\nimport {`,
};

const websocketEventsGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/websocket/{{dashCase name}}-event-listeners.ts',
  templateFile: 'plop-templates/domains/infra/websocket/websocket-events.hbs',
  skipIfExists: true,
};

const sharedInfraWebsocketEventsIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/websocket/index.ts',
  templateFile: 'plop-templates/domains/infra/websocket/index.hbs',
  pattern: 'append',
  skipIfExists: true,
};

const sharedInfraWebsocketEventsFolderGenerator = [
  websocketEventAppender,
  websocketEventsGenerator,
  websocketEventImportAppender,
  sharedInfraWebsocketEventsIndexGenerator,
];

module.exports = {
  websocketEventAppender,
  websocketEventsGenerator,
  websocketEventImportAppender,
  sharedInfraWebsocketEventsIndexGenerator,
  sharedInfraWebsocketEventsFolderGenerator,
};
