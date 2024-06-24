import { Validation } from '@/shared/interface/validation/protocols';

import {
  RequiredFieldsValidation,
  ValidationComposite,
  NameValidation
} from '@/shared/interface/validation/validators';

import {
  ValidatorNameAdapter,
} from '@/shared/infra/validators';

const validations: Validation[] = [];

for (const field of ['name']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new NameValidation('name', new ValidatorNameAdapter()));

export const makeCreateHotelValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
