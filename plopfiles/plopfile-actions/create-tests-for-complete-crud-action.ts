const {
  factoryForEntityGenerator: crudTestsEntityGenerator,
} = require('../generators/tests/domain/default-test-domain-generators.ts');
const {
  infraTestsForCompleteCrudsGenerator: crudTestsInfraGenerator,
} = require('../generators/tests/infra/default-test-infra-generators.ts');
const {
  usecaseTestsForCompleteCrudGenerator: crudTestsUsecaseGenerator,
} = require('../generators/tests/usecases/defaut-usecase-test-generators.ts');

const createTestsForCompleteCrudAction = [
  ...crudTestsEntityGenerator,
  ...crudTestsInfraGenerator,
  ...crudTestsUsecaseGenerator,
];

module.exports = {
  createTestsForCompleteCrudAction,
};
