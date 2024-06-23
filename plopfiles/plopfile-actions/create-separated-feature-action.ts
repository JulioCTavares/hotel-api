const {
  createHttpFactoryForSeparatedFeatureGenerator: separatedFactoriesGenerator,
} = require('../generators/src/factories/http/default-http-controller-generators.ts');
const {
  prismaRepositoryForSeparatedFeatureGenerator: separatedPrismaGenerator,
} = require('../generators/src/infra/prisma/default-prisma-generators.ts');
const {
  httpControllerForSeparatedFeatureGenerator: separatedHttpControlerGenerator,
} = require('../generators/src/interface/http/default-http-controller-generators.ts');
const {
  controllerForSeparatedFeatureGenerator: separatedControllerGenerator,
} = require('../generators/src/interface/controllers/default-controller-generators.ts');
const {
  validationForSeparatedFeatureGenerator: separatedValidationGenerator,
} = require('../generators/src/interface/validation/default-validation-generators.ts');
const {
  repositoryForSeparatedFeatureGenerator: separatedRepositoryGenerator,
} = require('../generators/src/usecases/repos/default-repository-generators.ts');
const {
  usecaseForSeparatedFeatureGenerator: separatedUsecaseGenerator,
} = require('../generators/src/usecases/default-usecase-generators.ts');

const createSeparatedFeatureAction = [
  separatedFactoriesGenerator,
  ...separatedPrismaGenerator,
  ...separatedHttpControlerGenerator,
  ...separatedControllerGenerator,
  ...separatedValidationGenerator,
  ...separatedRepositoryGenerator,
  ...separatedUsecaseGenerator,
];

module.exports = {
  createSeparatedFeatureAction,
};
