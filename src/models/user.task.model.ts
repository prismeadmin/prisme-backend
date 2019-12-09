import { Entity, model, property } from '@loopback/repository';

@model()
export class UserTask extends Entity {

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
  category_id: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    required: true,
  })
  task_type: string;

  @property({
    type: 'string',
    required: true,
  })
  task_id: string;

  @property({
    type: 'string',
    required: false,
  })
  rate: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  days: string;

  @property.array(String)
  permissions: String[]


  constructor(data?: Partial<UserTask>) {
    super(data);
  }
}

export interface UserTaskRelations {
  // describe navigational properties here
}

export type UserTaskWithRelations = UserTask & UserTaskRelations;
