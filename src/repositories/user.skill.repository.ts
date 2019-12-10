import { DefaultCrudRepository } from '@loopback/repository';
import { UserSkill, UserSkillRelations } from '../models';
import { MongoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserSkillRepository extends DefaultCrudRepository<
  UserSkill,
  typeof UserSkill.prototype.id,
  UserSkillRelations
  > {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(UserSkill, dataSource);
  }
}
