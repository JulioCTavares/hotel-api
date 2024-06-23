const {
  commandWithInputName,
  commandWithInputEntity,
  commandWithInputFeature,
  commandWithMethodInput,
} = require('./plopfiles/commands/default-commands.ts')

const {
  createCompleteCrudAction,
} = require('./plopfiles/plopfile-actions/create-complete-crud-action.ts')
const {
  createTestsForCompleteCrudAction,
} = require('./plopfiles/plopfile-actions/create-tests-for-complete-crud-action.ts')
const {
  createSeparatedFeatureAction,
} = require('./plopfiles/plopfile-actions/create-separated-feature-action.ts')
const {
  createWebsocketSetupAction,
} = require('./plopfiles/plopfile-actions/create-websocket-setup-action.ts')
const {
  createWebsocketListenerAction,
} = require('./plopfiles/plopfile-actions/create-websocket-listener-action.ts')

module.exports = function (plop) {
  plop.setGenerator('[NEW DOMAIN]: Create new Domain', {
    description: 'Generate a new domain',
    prompts: [commandWithInputName],
    actions: createCompleteCrudAction,
  })
  plop.setGenerator('[DOMAIN TESTS]: Create tests for a domain', {
    description: 'Generate all tests for a provided domain',
    prompts: [commandWithInputName],
    actions: createTestsForCompleteCrudAction,
  })
  plop.setGenerator('[NEW FEATURE]: Create a new feature for a valid domain', {
    description: 'Generate new feature files',
    prompts: [
      commandWithInputEntity,
      commandWithInputFeature,
      commandWithMethodInput,
    ],
    actions: createSeparatedFeatureAction,
  })
  plop.setGenerator(
    '[PLUG WEBSOCKETS]: Create setup for websockets as plug-and-play feature',
    {
      description: 'Plug and play websocket to the project',
      prompts: [],
      actions: createWebsocketSetupAction,
    },
  )
  plop.setGenerator(
    '[SOCKETS LISTENER]: Create an websocket listener feature',
    {
      description: 'Add a new websocket listener to the project',
      prompts: [commandWithInputName, commandWithInputFeature],
      actions: createWebsocketListenerAction,
    },
  )
}
