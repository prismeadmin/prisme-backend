import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {Position, PositionRelations, Skill} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SkillRepository} from './skill.repository';


export class PositionRepository extends DefaultCrudRepository<Position,
  typeof Position.prototype.id,
  PositionRelations> {
  public readonly skills: HasManyRepositoryFactory<Skill,
    typeof Position.prototype.id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
    @repository.getter('SkillRepository')
    protected skillRepositoryGetter: Getter<SkillRepository>,
  ) {
    super(Position, dataSource);
    // this.skills = this.createHasManyRepositoryFactoryFor(
    //   'skills',
    //   skillRepositoryGetter,
    // );
  }
}
