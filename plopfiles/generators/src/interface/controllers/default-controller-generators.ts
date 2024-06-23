const controllerIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/controllers/index.ts',
  templateFile: 'plop-templates/domains/interface/controllers/index.hbs',
};

const controllerForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/controllers/create-{{dashCase name}}-controller.ts',
  templateFile:
    'plop-templates/domains/interface/controllers/create-entity-controller.hbs',
};

const controllerForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/controllers/get-{{dashCase name}}-by-id-controller.ts',
  templateFile:
    'plop-templates/domains/interface/controllers/get-entity-by-id-controller.hbs',
};

const controllerForGetByFiltersFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/controllers/delete-{{dashCase name}}-by-id-controller.ts',
  templateFile:
    'plop-templates/domains/interface/controllers/delete-entity-by-id-controller.hbs',
};

const controllerForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/controllers/update-{{dashCase name}}-by-id-controller.ts',
  templateFile:
    'plop-templates/domains/interface/controllers/update-entity-by-id-controller.hbs',
};

const controllerForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/controllers/get-{{dashCase name}}s-by-filter-controller.ts',
  templateFile:
    'plop-templates/domains/interface/controllers/get-entities-by-filter-controller.hbs',
};

const createControllerForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/interface/controllers/{{dashCase feature}}-controller.ts',
  templateFile:
    'plop-templates/domains/interface/controllers/default-entity-controller.hbs',
};

const controllerIndexAppendImportGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase entity}}/interface/controllers/index.ts',
  separator: '',
  templateFile: 'plop-templates/domains/interface/controllers/append-index.hbs',
};

const controllerForSeparatedFeatureGenerator = [
  createControllerForSeparatedFeatureGenerator,
  controllerIndexAppendImportGenerator,
];

const controllersForCompleteCrudGenerator = [
  controllerForCreateFeatureGenerator,
  controllerForGetByIdFeatureGenerator,
  controllerForGetByFiltersFeatureGenerator,
  controllerForDeleteFeatureGenerator,
  controllerForUpdateFeatureGenerator,
  controllerIndexGenerator,
];

module.exports = {
  controllersForCompleteCrudGenerator,
  controllerForCreateFeatureGenerator,
  controllerForGetByIdFeatureGenerator,
  controllerForGetByFiltersFeatureGenerator,
  controllerForDeleteFeatureGenerator,
  controllerForUpdateFeatureGenerator,
  controllerForSeparatedFeatureGenerator,
  controllerIndexGenerator,
};
