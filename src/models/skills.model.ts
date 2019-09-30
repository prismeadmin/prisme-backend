import { Entity, model, property } from '@loopback/repository';

/**
 * Item in a skill array
 */
@model()
export class Skill extends Entity {
  /**
   * Skill id
   */
  @property({ id: true, required: false })
  id: string;

  /**
   * Name
   */
  @property({ required: true })
  name: string;

  constructor(data?: Partial<Skill>) {
    super(data);
  }
}
