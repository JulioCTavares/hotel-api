const usecaseIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/index.ts',
  templateFile: 'plop-templates/domains/usecases/index.hbs',
};

const usecaseForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/create-{{dashCase name}}-usecase.ts',
  templateFile: 'plop-templates/domains/usecases/create-entity-usecase.hbs',
};

const usecaseForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/get-{{dashCase name}}-by-id-usecase.ts',
  templateFile: 'plop-templates/domains/usecases/get-entity-by-id-usecase.hbs',
};

const usecaseForGetByFilterFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/get-{{dashCase name}}s-by-filter-usecase.ts',
  templateFile:
    'plop-templates/domains/usecases/get-entities-by-filter-usecase.hbs',
};

const usecaseForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/delete-{{dashCase name}}-by-id-usecase.ts',
  templateFile:
    'plop-templates/domains/usecases/delete-entity-by-id-usecase.hbs',
};

const createUsecaseForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/usecases/{{dashCase feature}}-usecase.ts',
  templateFile: 'plop-templates/domains/usecases/default-entity-usecase.hbs',
};

const usecaseForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/update-{{dashCase name}}-by-id-usecase.ts',
  templateFile:
    'plop-templates/domains/usecases/update-entity-by-id-usecase.hbs',
};

const usecaseIndexAppendImportGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase entity}}/usecases/index.ts',
  separator: '',
  templateFile: 'plop-templates/domains/usecases/append-index.hbs',
};

const usecaseForSeparatedFeatureGenerator = [
  createUsecaseForSeparatedFeatureGenerator,
  usecaseIndexAppendImportGenerator,
];

const usecasesForCompleteCrudGenerator = [
  usecaseForCreateFeatureGenerator,
  usecaseForDeleteFeatureGenerator,
  usecaseForGetByIdFeatureGenerator,
  usecaseForGetByFilterFeatureGenerator,
  usecaseForUpdateFeatureGenerator,
  usecaseIndexGenerator,
];

module.exports = {
  usecasesForCompleteCrudGenerator,
  usecaseForCreateFeatureGenerator,
  usecaseForDeleteFeatureGenerator,
  usecaseForGetByIdFeatureGenerator,
  usecaseForGetByFilterFeatureGenerator,
  usecaseForUpdateFeatureGenerator,
  usecaseForSeparatedFeatureGenerator,
  usecaseIndexGenerator,
};
