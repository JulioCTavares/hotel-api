const testsForCountRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/count-{{dashCase name}}s-by-filter-repository.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/prisma/repositories/count-entitys-by-filter-repository.spec.hbs',
};

const testsForDeleteRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/delete-{{dashCase name}}-by-id-repository.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/prisma/repositories/delete-entity-by-id-repository.spec.hbs',
};

const testsForGetByIdRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/get-{{dashCase name}}-by-id-repository.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/prisma/repositories/get-entity-by-id-repository.spec.hbs',
};

const testsForGetByNameRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/get-{{dashCase name}}-by-name-repository.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/prisma/repositories/get-entity-by-name-repository.spec.hbs',
};

const testsForGetByFilterRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/get-{{dashCase name}}s-by-filter-repository.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/prisma/repositories/get-entitys-by-filter-repository.spec.hbs',
};

const testsForSaveRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/save-{{dashCase name}}-repository.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/prisma/repositories/save-entity-repository.spec.hbs',
};

const testsForUpdateRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/update-{{dashCase name}}-repository.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/prisma/repositories/update-entity-repository.spec.hbs',
};

const testsForCreateRouteGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/express/create-{{dashCase name}}.e2e.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/express/create-entity.e2e.spec.hbs',
};

const testsForDeleteRouteGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/express/delete-{{dashCase name}}-by-id.e2e.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/express/delete-entity-by-id.e2e.spec.hbs',
};

const testsForGetByFiltersRouteGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/express/get-{{dashCase name}}s-by-filter.e2e.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/express/get-entities-by-filter.e2e.spec.hbs',
};

const testsForGetByNameRouteGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/express/get-{{dashCase name}}-by-id.e2e.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/express/get-entity-by-id.e2e.spec.hbs',
};

const testsForUpdateRouteGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/express/update-{{dashCase name}}-by-id.e2e.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/infra/express/update-entity-by-id.e2e.spec.hbs',
};

const infraTestsForCompleteCrudsGenerator = [
  testsForCountRepositoryGenerator,
  testsForDeleteRepositoryGenerator,
  testsForGetByIdRepositoryGenerator,
  testsForGetByNameRepositoryGenerator,
  testsForGetByFilterRepositoryGenerator,
  testsForSaveRepositoryGenerator,
  testsForUpdateRepositoryGenerator,
  testsForCreateRouteGenerator,
  testsForDeleteRouteGenerator,
  testsForGetByFiltersRouteGenerator,
  testsForGetByNameRouteGenerator,
  testsForUpdateRouteGenerator,
];

module.exports = {
  infraTestsForCompleteCrudsGenerator,
  testsForCountRepositoryGenerator,
  testsForDeleteRepositoryGenerator,
  testsForGetByIdRepositoryGenerator,
  testsForGetByNameRepositoryGenerator,
  testsForGetByFilterRepositoryGenerator,
  testsForSaveRepositoryGenerator,
  testsForUpdateRepositoryGenerator,
  testsForCreateRouteGenerator,
  testsForDeleteRouteGenerator,
  testsForGetByFiltersRouteGenerator,
  testsForGetByNameRouteGenerator,
  testsForUpdateRouteGenerator,
};
