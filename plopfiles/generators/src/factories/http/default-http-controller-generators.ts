const httpIndexFactoryGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/http/index.ts',
  templateFile: 'plop-templates/domains/factories/http/index.hbs',
};

const httpFactoryForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/http/http-create-{{dashCase name}}-controller-factory.ts',
  templateFile: 'plop-templates/domains/factories/http/http-create-entity-controller-factory.hbs',
};

const httpFactoryForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/http/http-get-{{dashCase name}}-by-id-controller-factory.ts',
  templateFile: 'plop-templates/domains/factories/http/http-get-entity-by-id-controller-factory.hbs',
};

const httpFactoryForGetByFiltersFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/http/http-get-{{dashCase name}}s-by-filter-controller-factory.ts',
  templateFile: 'plop-templates/domains/factories/http/http-get-entities-by-filter-controller-factory.hbs',
};

const httpFactoryForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/http/http-delete-{{dashCase name}}-by-id-controller-factory.ts',
  templateFile: 'plop-templates/domains/factories/http/http-delete-entity-by-id-controller-factory.hbs',
};

const httpFactoryForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/factories/http/http-update-{{dashCase name}}-by-id-controller-factory.ts',
  templateFile: 'plop-templates/domains/factories/http/http-update-entity-by-id-controller-factory.hbs',
};

const createHttpFactoryForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/factories/http/http-{{dashCase feature}}-controller-factory.ts',
  templateFile: 'plop-templates/domains/factories/http/http-default-entity-controller-factory.hbs',
};

const httpFactoriesForCompleteCrudGenerator = [
  httpFactoryForCreateFeatureGenerator,
  httpFactoryForGetByIdFeatureGenerator,
  httpFactoryForGetByFiltersFeatureGenerator,
  httpFactoryForDeleteFeatureGenerator,
  httpFactoryForUpdateFeatureGenerator,
  httpIndexFactoryGenerator,
];

module.exports = {
  httpFactoriesForCompleteCrudGenerator,
  httpFactoryForCreateFeatureGenerator,
  httpFactoryForGetByIdFeatureGenerator,
  httpFactoryForGetByFiltersFeatureGenerator,
  httpFactoryForDeleteFeatureGenerator,
  httpFactoryForUpdateFeatureGenerator,
  createHttpFactoryForSeparatedFeatureGenerator,
  httpIndexFactoryGenerator,
};
