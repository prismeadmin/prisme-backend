import { repository } from '@loopback/repository';
import { UserRepository, Credentials } from '../repositories/';
import { post, getJsonSchemaRef, requestBody, get, put, param, getModelSchemaRef, HttpErrors } from '@loopback/rest';
import { validateCredentials } from '../services/validator';
import { User } from '../models';
import { inject } from '@loopback/core';
import * as _ from 'lodash';
import { BcryptHasher } from '../services/hash.password.bcrypt';
import { CreadentialsRequestBody, ResponseType } from './specs/user.controller.specs'
import { MyUserService } from '../services/user-service'
import { JWTService } from '../services/jwt-service';
import { PasswordHasherBindings, UserServiceBindings, TokenServiceBindings } from '../keys';
import { UserProfile } from '@loopback/security';
import { authenticate, AuthenticationBindings } from '@loopback/authentication';

// Uncomment these imports to begin using these cool features!

//import { inject } from '@loopback/context';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService
  ) { }

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: getJsonSchemaRef(User),
          },
        },
      },
    },
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { exclude: ['id'] }),
        },
      },
    })
    userData: Omit<User, 'id'>,
  ): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: userData.email,
      },
    });
    if (foundUser) {
      throw new HttpErrors.Forbidden(`Email ${userData.email} already exists`);
    }

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
    const token = await this.jwtService.generateToken(userProfile)
    return Promise.resolve({ token })
  }

  @get('/users/me')
  @authenticate('jwt')
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser)
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })

  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() currentUser: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, currentUser);
  }
}
