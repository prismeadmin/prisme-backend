import { Entity, model, property } from '@loopback/repository';
import { Task } from './goal.task.model'

@model({ settings: {} })
export class Goal extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property.array(Task)
  tasks: Task[];

  constructor(data?: Partial<Goal>) {
    super(data);
  }
}

export interface GoalRelations {
  // describe navigational properties here
}

export type GoalWithRelations = Goal & GoalRelations;
