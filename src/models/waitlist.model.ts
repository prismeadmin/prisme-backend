import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Waitlist extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    id: true,
    required: true
  })
  email: string;

  constructor(data?: Partial<Waitlist>) {
    super(data);
  }
}

export interface WaitlistRelations {
  // describe navigational properties here
}

export type WaitlistWithRelations = Waitlist & WaitlistRelations;
