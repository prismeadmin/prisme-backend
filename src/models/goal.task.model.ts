import { Entity, model, property } from '@loopback/repository';

/**
 * Item in a task array
 */
@model()
export class Task extends Entity {
  /**
   * Skill id
   */
  @property({
    type: 'string',
    id: true,
    required: false,
    generated: true,
  })
  id: string;

  /**
   * Title
   */
  @property({ required: true })
  name: string;



  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
