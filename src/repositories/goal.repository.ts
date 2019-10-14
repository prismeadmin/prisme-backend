import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import { Goal, GoalRelations, Task } from '../models';
import { MongoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TaskRepository } from './goal.task.repository';


export class GoalRepository extends DefaultCrudRepository<
  Goal,
  typeof Goal.prototype.id,
  GoalRelations
  > {
  public readonly tasks: HasManyRepositoryFactory<
    Task,
    typeof Goal.prototype.id
  >;
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
    @repository.getter('TaskRepository')
    protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(Goal, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor(
      'tasks',
      taskRepositoryGetter,
    );
  }
}
