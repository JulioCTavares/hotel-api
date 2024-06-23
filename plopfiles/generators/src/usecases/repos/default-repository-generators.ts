const repositoryIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/index.ts',
  templateFile: 'plop-templates/domains/usecases/repos/index.hbs',
};

const repositoryForCountFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/count-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/count-entities-by-filter-repository.hbs',
};

const repositoryForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/get-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/get-entity-by-id-repository.hbs',
};

const repositoryForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/delete-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/delete-entity-by-id-repository.hbs',
};

const repositoryForSaveFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/save-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/save-entity-repository.hbs',
};

const repositoryForGetByFilterFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/get-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/get-entities-by-filter-repository.hbs',
};

const repositoryForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/update-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/update-entity-repository.hbs',
};

const repositoryForGetByNameFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/repos/get-{{dashCase name}}-by-name-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/get-entity-by-name-repository.hbs',
};

const createReposForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/usecases/repos/{{dashCase feature}}-repository.ts',
  templateFile:
    'plop-templates/domains/usecases/repos/default-entity-repository.hbs',
};

const repositoryIndexAppendImportGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase entity}}/usecases/repos/index.ts',
  separator: '',
  templateFile: 'plop-templates/domains/usecases/repos/append-index.hbs',
};

const repositoryForSeparatedFeatureGenerator = [
  createReposForSeparatedFeatureGenerator,
  repositoryIndexAppendImportGenerator,
];

const repositoriesForCompleteCrudGenerator = [
  repositoryForCountFeatureGenerator,
  repositoryForGetByIdFeatureGenerator,
  repositoryForDeleteFeatureGenerator,
  repositoryForSaveFeatureGenerator,
  repositoryForGetByFilterFeatureGenerator,
  repositoryForUpdateFeatureGenerator,
  repositoryForGetByNameFeatureGenerator,
  repositoryIndexGenerator,
];

module.exports = {
  repositoriesForCompleteCrudGenerator,
  repositoryForCountFeatureGenerator,
  repositoryForGetByIdFeatureGenerator,
  repositoryForDeleteFeatureGenerator,
  repositoryForSaveFeatureGenerator,
  repositoryForGetByFilterFeatureGenerator,
  repositoryForUpdateFeatureGenerator,
  repositoryForGetByNameFeatureGenerator,
  repositoryForSeparatedFeatureGenerator,
  repositoryIndexGenerator,
};
