import * as isEmail from 'isemail';
import { Credentials } from '../repositories/user.repository';
import { HttpErrors } from '@loopback/rest';

export function validateCredentials(creadentials: Credentials) {
  if (!isEmail.validate(creadentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid email');
  }

  if (creadentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'password length should be at least 8 characters',
    );
  }
}
