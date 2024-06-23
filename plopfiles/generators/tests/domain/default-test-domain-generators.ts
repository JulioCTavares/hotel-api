const indexForDefaultEntityGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/entities/index.ts',
  templateFile: 'plop-templates/__tests__/domains/entities/index.hbs',
};

const factoryForDefaultEntityGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/entities/{{dashCase name}}.factory.ts',
  templateFile: 'plop-templates/__tests__/domains/entities/entity.factory.hbs',
};

const factoryForEntityGenerator = [
  indexForDefaultEntityGenerator,
  factoryForDefaultEntityGenerator,
];

module.exports = {
  factoryForEntityGenerator,
};
