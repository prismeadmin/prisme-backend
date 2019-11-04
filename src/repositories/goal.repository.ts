import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {Goal, GoalRelations, Task, Todo} from '../models';
import {MongoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TaskRepository} from './goal.task.repository';


export class GoalRepository extends DefaultCrudRepository<Goal,
  typeof Goal.prototype.id,
  GoalRelations> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Goal, dataSource);
  }
}
