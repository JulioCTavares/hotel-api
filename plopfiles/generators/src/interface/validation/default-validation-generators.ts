const validationIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/validation/index.ts',
  templateFile: 'plop-templates/domains/interface/validation/index.hbs',
};

const validationForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/validation/create-{{dashCase name}}-validation.ts',
  templateFile:
    'plop-templates/domains/interface/validation/create-entity-validation.hbs',
};

const validationForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/validation/delete-{{dashCase name}}-by-id-validation.ts',
  templateFile:
    'plop-templates/domains/interface/validation/delete-entity-by-id-validation.hbs',
};

const validationForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/validation/get-{{dashCase name}}-by-id-validation.ts',
  templateFile:
    'plop-templates/domains/interface/validation/get-entity-by-id-validation.hbs',
};

const validationForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/validation/update-{{dashCase name}}-by-id-validation.ts',
  templateFile:
    'plop-templates/domains/interface/validation/update-entity-by-id-validation.hbs',
};

const validationForGetByFilterFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/validation/get-{{dashCase name}}s-by-filter-validation.ts',
  templateFile:
    'plop-templates/domains/interface/validation/get-entities-by-filter-validation.hbs',
};

const createValidationForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/interface/validation/{{dashCase feature}}-validation.ts',
  templateFile:
    'plop-templates/domains/interface/validation/default-entity-validation.hbs',
};

const validationIndexAppendImportGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase entity}}/interface/validation/index.ts',
  separator: '',
  templateFile: 'plop-templates/domains/interface/validation/append-index.hbs',
};

const validationForSeparatedFeatureGenerator = [
  createValidationForSeparatedFeatureGenerator,
  validationIndexAppendImportGenerator,
];

const validationForCompleteCrudGenerator = [
  validationForCreateFeatureGenerator,
  validationForDeleteFeatureGenerator,
  validationForGetByIdFeatureGenerator,
  validationForUpdateFeatureGenerator,
  validationForGetByFilterFeatureGenerator,
  validationIndexGenerator,
];

module.exports = {
  validationForCompleteCrudGenerator,
  validationForCreateFeatureGenerator,
  validationForDeleteFeatureGenerator,
  validationForGetByIdFeatureGenerator,
  validationForUpdateFeatureGenerator,
  validationForGetByFilterFeatureGenerator,
  validationForSeparatedFeatureGenerator,
  validationIndexGenerator,
};
