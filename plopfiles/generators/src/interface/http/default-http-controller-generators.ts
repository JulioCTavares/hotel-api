const httpControllerIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/http/index.ts',
  templateFile: 'plop-templates/domains/interface/http/index.hbs',
};

const httpControllerForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/http/http-create-{{dashCase name}}-controller.ts',
  templateFile:
    'plop-templates/domains/interface/http/http-create-entity-controller.hbs',
};

const httpControllerForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/http/http-delete-{{dashCase name}}-by-id-controller.ts',
  templateFile:
    'plop-templates/domains/interface/http/http-delete-entity-by-id-controller.hbs',
};

const httpControllerForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/http/http-get-{{dashCase name}}-by-id-controller.ts',
  templateFile:
    'plop-templates/domains/interface/http/http-get-entity-by-id-controller.hbs',
};

const httpControllerForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/http/http-update-{{dashCase name}}-by-id-controller.ts',
  templateFile:
    'plop-templates/domains/interface/http/http-update-entity-by-id-controller.hbs',
};

const httpControllerForGetByFiltersFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/http/http-get-{{dashCase name}}s-by-filter-controller.ts',
  templateFile:
    'plop-templates/domains/interface/http/http-get-entities-by-filter-controller.hbs',
};

const createHttpControllerForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/interface/http/http-{{dashCase feature}}-controller.ts',
  templateFile:
    'plop-templates/domains/interface/http/http-default-entity-controller.hbs',
};

const httpControllerIndexAppendImportGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase entity}}/interface/http/index.ts',
  separator: '',
  templateFile: 'plop-templates/domains/interface/http/append-index.hbs',
};

const httpControllerForSeparatedFeatureGenerator = [
  createHttpControllerForSeparatedFeatureGenerator,
  httpControllerIndexAppendImportGenerator,
];

const httpControllerForCompleteCrudGenerator = [
  httpControllerForCreateFeatureGenerator,
  httpControllerForGetByIdFeatureGenerator,
  httpControllerForGetByFiltersFeatureGenerator,
  httpControllerForUpdateFeatureGenerator,
  httpControllerForDeleteFeatureGenerator,
  httpControllerIndexGenerator,
];

module.exports = {
  httpControllerForCompleteCrudGenerator,
  httpControllerForCreateFeatureGenerator,
  httpControllerForGetByIdFeatureGenerator,
  httpControllerForGetByFiltersFeatureGenerator,
  httpControllerForUpdateFeatureGenerator,
  httpControllerForDeleteFeatureGenerator,
  httpControllerForSeparatedFeatureGenerator,
  httpControllerIndexGenerator,
};
