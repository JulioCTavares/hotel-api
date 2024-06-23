const expressRouterIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/express/index.ts',
  templateFile: 'plop-templates/domains/infra/express/index.hbs',
};

const expressRouterGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/infra/express/{{dashCase name}}-routes.ts',
  templateFile: 'plop-templates/domains/infra/express/entity-routes.hbs',
};

const expressRouterForCompleteCrudGenerator = [
  expressRouterGenerator,
  expressRouterIndexGenerator,
];

module.exports = {
  expressRouterForCompleteCrudGenerator,
  expressRouterIndexGenerator,
  expressRouterGenerator,
};
