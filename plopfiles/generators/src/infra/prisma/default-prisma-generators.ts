const repositoriesPrismaIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/index.ts',
  templateFile: 'plop-templates/domains/infra/prisma/index.hbs',
};

const repositoryForPrismaSaveFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-save-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-save-entity-repository.hbs',
};

const repositoryForPrismaCountFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-count-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-count-entities-by-filter-repository.hbs',
};

const repositoryForPrismaDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-delete-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-delete-entity-by-id-repository.hbs',
};

const repositoryForPrismaGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-get-entity-by-id-repository.hbs',
};

const repositoryForPrismaGetByNameFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}-by-name-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-get-entity-by-name-repository.hbs',
};

const repositoryForPrismagetByFiltersFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-get-entities-by-filter-repository.hbs',
};

const repositoryForPrismaUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-update-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-update-entity-repository.hbs',
};

const schemaPrismaAppendModelGenerator = {
  type: 'append',
  path: 'src/main/infra/prisma/schema.prisma',
  separator: '',
  templateFile: 'plop-templates/domains/infra/prisma/prisma-schema.hbs',
};

const createPrismaRepositoryForSeparatedFeatureGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase entity}}/infra/prisma/repositories/prisma-{{dashCase feature}}-repository.ts',
  templateFile:
    'plop-templates/domains/infra/prisma/prisma-default-entity-repository.hbs',
};

const prismaRepositoryIndexAppendImportGenerator = {
  type: 'append',
  path: 'src/domains/{{dashCase entity}}/infra/prisma/repositories/index.ts',
  separator: '',
  templateFile: 'plop-templates/domains/infra/prisma/append-index.hbs',
};

const prismaRepositoryForSeparatedFeatureGenerator = [
  createPrismaRepositoryForSeparatedFeatureGenerator,
  prismaRepositoryIndexAppendImportGenerator,
];

const prismaRepositoriesForCompleteCrudGenerator = [
  repositoryForPrismaSaveFeatureGenerator,
  repositoryForPrismaCountFeatureGenerator,
  repositoryForPrismaDeleteFeatureGenerator,
  repositoryForPrismaGetByIdFeatureGenerator,
  repositoryForPrismaGetByNameFeatureGenerator,
  repositoryForPrismagetByFiltersFeatureGenerator,
  repositoryForPrismaUpdateFeatureGenerator,
  schemaPrismaAppendModelGenerator,
  repositoriesPrismaIndexGenerator,
];

module.exports = {
  prismaRepositoriesForCompleteCrudGenerator,
  repositoryForPrismaSaveFeatureGenerator,
  repositoryForPrismaCountFeatureGenerator,
  repositoryForPrismaDeleteFeatureGenerator,
  repositoryForPrismaGetByIdFeatureGenerator,
  repositoryForPrismaGetByNameFeatureGenerator,
  repositoryForPrismagetByFiltersFeatureGenerator,
  repositoryForPrismaUpdateFeatureGenerator,
  schemaPrismaAppendModelGenerator,
  prismaRepositoryForSeparatedFeatureGenerator,
  repositoriesPrismaIndexGenerator,
};
