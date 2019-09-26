import { Entity, model, property } from '@loopback/repository';

/**
 * Item in a skill array
 */
@model()
export class Skills extends Entity {
  /**
   * Skill id
   */
  @property({ id: true, required: false })
  skillId: string;

  /**
   * Name
   */
  @property({ required: true })
  name: string;

  constructor(data?: Partial<Skills>) {
    super(data);
  }
}
