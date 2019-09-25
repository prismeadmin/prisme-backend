import { Entity, model, property } from '@loopback/repository';

/**
 * Item in a shopping cart
 */
@model()
export class Skills extends Entity {
  /**
   * Skill id
   */
  @property({ id: true })
  skillId: string;

  /**
   * Name
   */
  @property()
  name: string;

  constructor(data?: Partial<Skills>) {
    super(data);
  }
}
