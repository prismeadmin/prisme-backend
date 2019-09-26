import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { MongoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export type Credentials = {
  email: string,
  password: string
}

export type Verify = {
  secretToken: string
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {
  constructor(@inject('datasources.mongoDS') dataSource: MongoDsDataSource) {
    super(User, dataSource);
  }
}
