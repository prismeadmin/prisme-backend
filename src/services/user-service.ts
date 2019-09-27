import { UserService } from '@loopback/authentication';
import { Credentials, UserRepository } from '../repositories/user.repository';
import { User } from '../models';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { inject } from '@loopback/core';
import { BcryptHasher } from './hash.password.bcrypt';
import { UserProfile, securityId } from '@loopback/security';
import { PasswordHasherBindings } from '../keys';


export class MyUserService implements UserService<User, Credentials>{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email
      }
    })

    if (!foundUser) {
      throw new HttpErrors.NotFound(`user not found with this email: ${credentials.email}`)
    }

    const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password)

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('password is not valid')
    }
    return foundUser
  }

  convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.firstName) userName = `${user.firstName}`;
    if (user.lastName)
      userName = user.firstName
        ? `${userName} ${user.lastName}`
        : `${user.lastName}`;
    return { [securityId]: user.id, name: userName };
  }
}
