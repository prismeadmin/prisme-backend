import { DefaultCrudRepository } from '@loopback/repository';
import { Skill, SkillRelations } from '../models';
import { MongoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id,
  SkillRelations
  > {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Skill, dataSource);
  }
}
