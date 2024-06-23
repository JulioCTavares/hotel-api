const { domainEntityGenerator: crudDomainGenerator } = require('../generators/src/domain/default-domain-generators.ts');
const { httpFactoriesForCompleteCrudGenerator: crudFactoriesGenerator } = require('../generators/src/factories/http/default-http-controller-generators.ts');
const { expressRouterForCompleteCrudGenerator: crudExpressGenerator } = require('../generators/src/infra/express/default-express-generators.ts');
const { prismaRepositoriesForCompleteCrudGenerator: crudPrismaGenerator } = require('../generators/src/infra/prisma/default-prisma-generators.ts');
const { swaggerForCompleteCrudGenerator: crudSwaggerGenerator } = require('../generators/src/infra/swagger/default-swagger-generators.ts');
const { httpControllerForCompleteCrudGenerator: crudHttpControlerGenerator } = require('../generators/src/interface/http/default-http-controller-generators.ts');
const { controllersForCompleteCrudGenerator: crudControllerGenerator } = require('../generators/src/interface/controllers/default-controller-generators.ts');
const { validationForCompleteCrudGenerator: crudValidationGenerator } = require('../generators/src/interface/validation/default-validation-generators.ts');
const { exceptionsForCompleteCrudGenerator: crudExceptionGenerator } = require('../generators/src/usecases/exceptions/default-exception-generators.ts');
const { repositoriesForCompleteCrudGenerator: crudRepositoryGenerator } = require('../generators/src/usecases/repos/default-repository-generators.ts');
const { usecasesForCompleteCrudGenerator: crudUsecaseGenerator } = require('../generators/src/usecases/default-usecase-generators.ts');
const { presenterForCompleteCrudGenerator: crudPresentersGenerator } = require('../generators/src/interface/presenters//default-presenter-generators.ts');

const createCompleteCrudAction = [
  ...crudDomainGenerator,
  ...crudFactoriesGenerator,
  ...crudExpressGenerator,
  ...crudPrismaGenerator,
  ...crudSwaggerGenerator,
  ...crudHttpControlerGenerator,
  ...crudControllerGenerator,
  ...crudValidationGenerator,
  ...crudExceptionGenerator,
  ...crudRepositoryGenerator,
  ...crudUsecaseGenerator,
  ...crudPresentersGenerator,
];

module.exports = {
  createCompleteCrudAction
};

