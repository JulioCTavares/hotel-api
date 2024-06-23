const commandWithInputName = {
  type: 'input',
  name: 'name',
  message: 'Name of entity',
};

const commandWithInputEntity = {
  type: 'input',
  name: 'entity',
  message: 'Name of the entity that will receive the usecase',
};

const commandWithInputFeature = {
  type: 'input',
  name: 'feature',
  message: 'Name of the feature',
};

const commandWithMethodInput = {
  type: 'input',
  name: 'method',
  message: 'Name of the repository method (i.g. listRepository: get, createRepository: save, updateRepository: update, deleteRepository: delete)',
};

module.exports = {
  commandWithInputName,
  commandWithInputEntity,
  commandWithInputFeature,
  commandWithMethodInput,
};
