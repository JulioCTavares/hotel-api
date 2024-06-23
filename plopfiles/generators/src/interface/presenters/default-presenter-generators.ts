const presenterIndexGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/presenters/index.ts',
  templateFile:
    'plop-templates/domains/interface/presenters/index.hbs',
};

const defaultPresenterGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/presenters/{{dashCase name}}-default-presenter.ts',
  templateFile:
    'plop-templates/domains/interface/presenters/default-presenter.hbs',
};

const defaulTransformersGenerator = {
  type: 'add',
  path: 'src/domains/{{dashCase name}}/interface/presenters/{{dashCase name}}-transformers.ts',
  templateFile:
    'plop-templates/domains/interface/presenters/default-transformer.hbs',
};

const presenterForCompleteCrudGenerator = [
  defaultPresenterGenerator,
  defaulTransformersGenerator,
  presenterIndexGenerator,
];

module.exports = {
  presenterForCompleteCrudGenerator,
  presenterIndexGenerator,
  defaultPresenterGenerator,
  defaulTransformersGenerator,
};
