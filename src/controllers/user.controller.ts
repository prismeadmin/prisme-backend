import { repository } from '@loopback/repository';
import { UserRepository, Credentials } from '../repositories/';
import { post, getJsonSchemaRef, requestBody } from '@loopback/rest';
import { validateCredentials } from '../services/validator';
import { User } from '../models';
import { inject } from '@loopback/core';
import * as _ from 'lodash';
import { BcryptHasher } from '../services/hash.password.bcrypt';
import { CreadentialsRequestBody, ResponseType } from './specs/user.controller.specs'
import { MyUserService } from '../services/user-service'

// Uncomment these imports to begin using these cool features!

//import { inject } from '@loopback/context';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('service.hasher')
    public hasher: BcryptHasher,
    @inject('services.user.service')
    public userService: MyUserService
  ) { }

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  async signup(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']));
    // eslint-disable-next-line require-atomic-updates
    userData.password = await this.hasher.hashPassword(userData.password);
    const savedUser = await this.userRepository.create(userData);
    delete savedUser.password;
    return savedUser;
  }

  @post('/users/login', ResponseType)

  async login(@requestBody(CreadentialsRequestBody) credentials: Credentials): Promise<{ token: string }> {
    const user = await this.userService.verifyCredentials(credentials)
    console.log(user)
    const userProfile = this.userService.convertToUserProfile(user)
    console.log(userProfile)
    return Promise.resolve({ token: '5646345346547658578' })
  }
}
