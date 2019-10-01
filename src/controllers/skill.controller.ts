import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Skill } from '../models';
import { SkillRepository } from '../repositories';

export class StudentController {
  constructor(
    @repository(SkillRepository)
    public skillRepository: SkillRepository,
  ) { }

  @get('/skills/count', {
    responses: {
      '200': {
        description: 'Skill model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Skill)) where?: Where<Skill>,
  ): Promise<Count> {
    return await this.skillRepository.count(where);
  }

  @get('/skills', {
    responses: {
      '200': {
        description: 'Array of Student model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Skill) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Skill)) filter?: Filter<Skill>,
  ): Promise<Skill[]> {
    return await this.skillRepository.find(filter);
  }

  @get('/skills/{id}', {
    responses: {
      '200': {
        description: 'Skills model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Skill) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Skill> {
    return this.skillRepository.findById(id);
  }


}
