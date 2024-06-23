const testsForCreateUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/create-{{dashCase name}}-usecase.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/usecases/create-entity-usecase.spec.hbs',
};

const testsForDeleteUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/delete-{{dashCase name}}-by-id-usecase.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/usecases/delete-entity-by-id-usecase.spec.hbs',
};

const testsForGetByIdUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/get-{{dashCase name}}-by-id-usecase.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/usecases/get-entity-by-id-usecase.spec.hbs',
};

const testsForGetByFilterUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/get-{{dashCase name}}s-by-filter-usecase.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/usecases/get-entitys-by-filter-usecase.spec.hbs',
};

const testsForUpdateUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/update-{{dashCase name}}-usecase.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/usecases/update-entity-usecase.spec.hbs',
};

const usecaseTestsForCompleteCrudGenerator = [
  testsForCreateUsecaseGenerator,
  testsForDeleteUsecaseGenerator,
  testsForGetByIdUsecaseGenerator,
  testsForGetByFilterUsecaseGenerator,
  testsForUpdateUsecaseGenerator,
];

module.exports = {
  usecaseTestsForCompleteCrudGenerator,
  testsForCreateUsecaseGenerator,
  testsForDeleteUsecaseGenerator,
  testsForGetByIdUsecaseGenerator,
  testsForGetByFilterUsecaseGenerator,
  testsForUpdateUsecaseGenerator,
};
