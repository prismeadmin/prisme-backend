import { DefaultCrudRepository } from '@loopback/repository';
import { Task, TaskRelations } from '../models';
import { MongoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
  > {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Task, dataSource);
  }
}
