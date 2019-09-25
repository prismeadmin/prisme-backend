import { Entity, model, property } from '@loopback/repository';
import { Skills } from './skills.model';

@model({ settings: {} })
export class Position extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  @property.array(Skills, { required: true })
  skills: Skills[];



  constructor(data?: Partial<Position>) {
    super(data);
  }
}

export interface PositionRelations {
  // describe navigational properties here
}

export type PositionWithRelations = Position & PositionRelations;
