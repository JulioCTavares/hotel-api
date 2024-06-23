const defaultSwaggerGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/swagger/{{dashCase name}}-paths.ts',
  templateFile: 'plop-templates/domains/infra/swagger/entity-paths.hbs',
};

const swaggerIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/swagger/index.ts',
  templateFile: 'plop-templates/domains/infra/swagger/index.hbs',
};

const swaggerForCompleteCrudGenerator = [
  defaultSwaggerGenerator,
  swaggerIndexGenerator,
];

module.exports = {
  swaggerForCompleteCrudGenerator,
  swaggerIndexGenerator,
  defaultSwaggerGenerator,
};
