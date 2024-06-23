const exceptionIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/exceptions/index.ts',
  templateFile: 'plop-templates/domains/usecases/exceptions/index.hbs',
};

const notFoundExceptionGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/exceptions/{{dashCase name}}-not-found-exception.ts',
  templateFile: 'plop-templates/domains/usecases/exceptions/entity-not-found-exception.hbs',
};

const alreadyExistsExceptionGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/usecases/exceptions/{{dashCase name}}-already-exists-exception.ts',
  templateFile: 'plop-templates/domains/usecases/exceptions/entity-already-exists-exception.hbs',
};

const exceptionsForCompleteCrudGenerator = [
  notFoundExceptionGenerator,
  alreadyExistsExceptionGenerator,
  exceptionIndexGenerator,
];

module.exports = {
  exceptionsForCompleteCrudGenerator,
  notFoundExceptionGenerator,
  alreadyExistsExceptionGenerator,
  exceptionIndexGenerator,
};
