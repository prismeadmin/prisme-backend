import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {post, getJsonSchemaRef, requestBody} from '@loopback/rest';
import {validateCredentials} from '../services/validator';
import {User} from '../models';
import * as _ from 'lodash';

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/signup', {
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
    const savedUser = await this.userRepository.create(userData);
    delete savedUser.password;
    return savedUser;
  }
}
