/* eslint-disable @typescript-eslint/camelcase */
import {
  repository
} from '@loopback/repository';
import {
  post,
  getModelSchemaRef,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { Waitlist } from '../models';
import { WaitlistRepository } from '../repositories';
import { validateCredentialsWaitlist } from '../services/validator';
import _ = require('lodash');
//const app = require('loopback-component-mailchimp')
import { keepSubscribers } from '../services/MailChimp'

export class WaitlistControllerController {
  constructor(
    @repository(WaitlistRepository)
    public waitlistRepository: WaitlistRepository,
  ) { }

  @post('/waitlists', {
    responses: {
      '200': {
        description: 'Waitlist model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Waitlist) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Waitlist),
        },
      },
    })
    waitlist: Waitlist,
  ): Promise<Waitlist> {
    const foundUser = await this.waitlistRepository.findOne({
      where: {
        email: waitlist.email,
      },
    });
    if (foundUser) {
      throw new HttpErrors.Forbidden(`Email ${waitlist.email} already exists`);
    }

    validateCredentialsWaitlist(_.pick(waitlist, ['email']));
    keepSubscribers(waitlist.email)
    return this.waitlistRepository.create(waitlist);
  }
}
