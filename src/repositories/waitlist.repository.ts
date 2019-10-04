import { DefaultCrudRepository } from '@loopback/repository';
import { Waitlist, WaitlistRelations } from '../models';
import { MongoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export type WaitlistCredentials = {
  email: string,
  firstName: string,
  secondName: string
}

export class WaitlistRepository extends DefaultCrudRepository<
  Waitlist,
  typeof Waitlist.prototype.id,
  WaitlistRelations
  > {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Waitlist, dataSource);
  }
}
