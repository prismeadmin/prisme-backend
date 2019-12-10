import { Entity, model, property } from '@loopback/repository';

@model()
export class UserSkill extends Entity {

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

  @property.array(Object)
  skills: Object[]

  @property.array(String)
  permissions: String[]


  constructor(data?: Partial<UserSkill>) {
    super(data);
  }
}

export interface UserSkillRelations {
  // describe navigational properties here
}

export type UserSkillWithRelations = UserSkill & UserSkillRelations;
