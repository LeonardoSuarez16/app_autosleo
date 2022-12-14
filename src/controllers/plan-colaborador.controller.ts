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
  Plan,
  Colaborador,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanColaboradorController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Array of Plan has many Colaborador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Colaborador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Colaborador>,
  ): Promise<Colaborador[]> {
    return this.planRepository.colaboradors(id).find(filter);
  }

  @post('/plans/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Colaborador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {
            title: 'NewColaboradorInPlan',
            exclude: ['cargo'],
            optional: ['planId']
          }),
        },
      },
    }) colaborador: Omit<Colaborador, 'cargo'>,
  ): Promise<Colaborador> {
    return this.planRepository.colaboradors(id).create(colaborador);
  }

  @patch('/plans/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Plan.Colaborador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {partial: true}),
        },
      },
    })
    colaborador: Partial<Colaborador>,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.planRepository.colaboradors(id).patch(colaborador, where);
  }

  @del('/plans/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Plan.Colaborador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.planRepository.colaboradors(id).delete(where);
  }
}
