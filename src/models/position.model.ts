import { Entity, model, property, hasMany } from '@loopback/repository';
import { Skill } from './skill.model';

@model({ settings: {} })
export class Position extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property.array(Skill, { required: true })
  skills: Skill[];

  /* @hasMany(() => Skill)
  skills: Skill[]; */



  constructor(data?: Partial<Position>) {
    super(data);
  }
}

export interface PositionRelations {
  // describe navigational properties here
}

export type PositionWithRelations = Position & PositionRelations;
