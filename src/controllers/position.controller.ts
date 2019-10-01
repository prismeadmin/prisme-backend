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
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Position } from '../models';
import { PositionRepository } from '../repositories';

export class PostionControllerController {
  constructor(
    @repository(PositionRepository)
    public positionRepository: PositionRepository,
  ) { }

  @get('/positions/count', {
    responses: {
      '200': {
        description: 'Postion model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Position)) where?: Where<Position>,
  ): Promise<Count> {
    return this.positionRepository.count(where);
  }

  @get('/positions', {
    responses: {
      '200': {
        description: 'Array of Position model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Position) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Position))
    filter?: Filter<Position>,
  ): Promise<Position[]> {
    return this.positionRepository.find(filter);
  }

  @get('/positions/{id}', {
    responses: {
      '200': {
        description: 'Position model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Position) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Position> {
    return this.positionRepository.findById(id);
  }

  /* @get('/postion/skill/{id}', {
    responses: {
      '200': {
        description: 'Position model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Position) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Position> {

  } */



  /* @patch('/todos', {
    responses: {
      '200': {
        description: 'Todo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, { partial: true }),
        },
      },
    })
    todo: Todo,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todoRepository.updateAll(todo, where);
  }

  @get('/todos/{id}', {
    responses: {
      '200': {
        description: 'Todo model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Todo) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Todo> {
    return this.todoRepository.findById(id);
  }

  @patch('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, { partial: true }),
        },
      },
    })
    todo: Todo,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @put('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo PUT success',
      },
    },
  })

  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() todo: Todo,
  ): Promise<void> {
    await this.todoRepository.replaceById(id, todo);
  }

  @del('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.todoRepository.deleteById(id);
  } */
}
