import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor
} from '@loopback/rest';

import { Goal } from '../models';
import { GoalRepository } from '../repositories';

export class GoalTaskController {
  constructor(
    @repository(GoalRepository)
    public goalRepository: GoalRepository,
  ) { }

  @get('/goalList/count', {
    responses: {
      '200': {
        description: 'Goal model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Goal)) where?: Where<Goal>,
  ): Promise<Count> {
    return this.goalRepository.count(where);
  }

  @get('/goalList', {
    responses: {
      '200': {
        description: 'Array of goal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Goal) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Goal)) filter?: Filter<Goal>,
  ): Promise<Goal[]> {
    return this.goalRepository.find(filter);
  }

  @get('/goalList/{id}', {
    responses: {
      '200': {
        description: 'Goal model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Goal) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Goal> {
    return this.goalRepository.findById(id);
  }
}
