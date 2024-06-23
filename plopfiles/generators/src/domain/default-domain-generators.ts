const classEntityGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/entities/{{dashCase name}}.ts',
  templateFile: 'plop-templates/domains/entities/entity.hbs',
};

const indexEntityGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/entities/index.ts',
  templateFile: 'plop-templates/domains/entities/index.hbs',
};

const entityInclusionsGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/entities/{{dashCase name}}-inclusions.ts',
  templateFile: 'plop-templates/domains/entities/entity-inclusions.hbs',
};

const domainEntityGenerator = [
  classEntityGenerator,
  entityInclusionsGenerator,
  indexEntityGenerator,
];

module.exports = {
  indexEntityGenerator,
  domainEntityGenerator,
  classEntityGenerator,
  entityInclusionsGenerator,
};
