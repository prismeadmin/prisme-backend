import { repository, Filter } from '@loopback/repository';
import { UserRepository, Credentials, UserTaskRepository, UserSkillRepository } from '../repositories/';
import {
  post,
  patch,
  getJsonSchemaRef,
  requestBody,
  get,
  put,
  param,
  getModelSchemaRef,
  getFilterSchemaFor,
  HttpErrors
} from '@loopback/rest';
import { validateCredentials } from '../services/validator';
import { User, UserTask, UserSkill } from '../models';
import { inject } from '@loopback/core';
import { sendEmail } from '../services/Mailer'
import * as _ from 'lodash';
import { BcryptHasher } from '../services/hash.password.bcrypt';
import { CreadentialsRequestBody, ResponseType, VerifyRequestBody } from './specs/user.controller.specs'
import { MyUserService } from '../services/user-service'
import { JWTService } from '../services/jwt-service';
import { PasswordHasherBindings, UserServiceBindings, TokenServiceBindings } from '../keys';
import { UserProfile } from '@loopback/security';
import { authenticate, AuthenticationBindings } from '@loopback/authentication';
const randomstring = require("randomstring");

// Uncomment these imports to begin using these cool features!

//import { inject } from '@loopback/context';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserTaskRepository)
    public userTaskRepository: UserTaskRepository,
    @repository(UserSkillRepository)
    public userSkillRepository: UserSkillRepository,
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

    validateCredentials(_.pick(userData, ['email', 'password', 'active']));

    // eslint-disable-next-line require-atomic-updates
    userData.password = await this.hasher.hashPassword(userData.password);
    const secretToken = randomstring.generate();
    userData.secretToken = secretToken
    userData.active = true;
    sendEmail(userData.email, secretToken)
    const savedUser = await this.userRepository.create(userData);
    console.log(userData.email)
    delete savedUser.password;
    return savedUser;
  }

  @post('/users/forgot', {
    responses: {
      '204': {
        description: 'Todo PATCH success',
      },
    },
  })
  async forgot(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User),
        },
      },
    })
    userData: User,
  ): Promise<void> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: userData.email,
      },
    });
    if (!foundUser) {
      throw new HttpErrors.Forbidden(`No email found`);
    }
    const user = { ...foundUser };
    const new_password = Math.random().toString(36).slice(-8);
    sendEmail(foundUser.email, new_password);
    user.password = await this.hasher.hashPassword(new_password);
    return await this.userRepository.updateById(foundUser.id, user);
  }


  @post('/users/login', ResponseType)

  async login(@requestBody(CreadentialsRequestBody) credentials: Credentials): Promise<{ token: Object }> {
    const user = await this.userService.verifyCredentials(credentials)
    //console.log(user)
    const userProfile = this.userService.convertToUserProfile(user)
    //console.log(userProfile)
    if (!user.active) {
      throw new HttpErrors.Unauthorized('user has not verified email')
    }
    user.count = String(Number(user.count) + 1);
    const token = {id: user.id, count: user.count};//await this.jwtService.generateToken(userProfile)
    const update = await this.userRepository.updateById(user.id, user);
    return Promise.resolve({token})
  }

  @post('/users/verify')
  async verify(
    @requestBody(VerifyRequestBody) userData: User
  ): Promise<void> {
    try {
      const foundUser = await this.userRepository.findOne({
        where: {
          secretToken: userData.secretToken
        }
      })

      if (!foundUser) {
        throw new HttpErrors.Forbidden(`No user found`)
      }

      const user = { ...foundUser };
      delete user.id;
      user.active = true;
      user.secretToken = '';
      return await this.userRepository.updateById(foundUser.id, user);

    } catch (err) {
      throw new HttpErrors.Forbidden(`Account has not been verified`);
    }
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

  @post('/users/task/create', {
    responses: {
      '200': {
        description: 'Create user task model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserTask) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTask),
        },
      },
    })
    usertask: UserTask,
  ): Promise<UserTask> {
    return await this.userTaskRepository.create(usertask);
  }

  @patch('/users/task/{id}', {
    responses: {
      '204': {
        description: 'Todo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserTask, { partial: true }),
        },
      },
    })
    userTask: UserTask,
  ): Promise<void> {
    await this.userTaskRepository.updateById(id, userTask);
  }

  @get('/users/task', {
    responses: {
      '200': {
        description: 'Position model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserTask) } },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserTask))
    filter?: Filter<UserTask>,
  ): Promise<UserTask[]> {
    return this.userTaskRepository.find(filter);
  }

  @post('/users/skill/new', {
    responses: {
      '200': {
        description: 'Create user skill model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserSkill) } },
      },
    },
  })
  async new(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSkill),
        },
      },
    })
    userSkill: UserSkill,
  ): Promise<UserSkill> {
    return await this.userSkillRepository.create(userSkill);
  }

  @get('/users/skill', {
    responses: {
      '200': {
        description: 'User skill',
        content: { 'application/json': { schema: getModelSchemaRef(UserSkill) } },
      },
    },
  })
  async skill(
    @param.query.object('filter', getFilterSchemaFor(UserSkill))
    filter?: Filter<UserSkill>,
  ): Promise<UserSkill[]> {
    return this.userSkillRepository.find(filter);
  }

  @patch('/users/skill/{id}', {
    responses: {
      '204': {
        description: 'Skill update success',
      },
    },
  })
  async skillUpdate(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSkill, { partial: true }),
        },
      },
    })
    userSkill: UserSkill,
  ): Promise<void> {
    await this.userSkillRepository.updateById(id, userSkill);
  }
}
