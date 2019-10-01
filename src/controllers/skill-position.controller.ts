import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Position,
  Skill,
} from '../models';
import { PositionRepository } from '../repositories';

export class PositionSkillController {
  constructor(
    @repository(PositionRepository) protected positionRepository: PositionRepository,
  ) { }

  @get('/skills/{id}/positions', {
    responses: {
      '200': {
        description: 'Array of Student\'s belonging to Course',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Skill) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Skill>,
  ): Promise<Skill[]> {
    return this.positionRepository.skills(id).find(filter);
  }
}
