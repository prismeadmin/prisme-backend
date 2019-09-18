import {genSalt, hash} from 'bcryptjs';
import {inject} from '@loopback/core';

interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
}

export class BcryptHasher implements PasswordHasher<string> {
  @inject('rounds')
  public readonly rounds: number;
  async hashPassword(password: string) {
    const salt = await genSalt(this.rounds);
    return await hash(password, salt);
  }
}
