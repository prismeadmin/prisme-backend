import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: false
  })
  secretToken: string;

  @property({
    type: 'boolean',
    required: false,
    default: false
  })
  active: boolean;

  @property({
    type: 'string',
    required: false,
    default: '0'
  })
  count: string;

  @property.array(String)
  permissions: String[]

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
