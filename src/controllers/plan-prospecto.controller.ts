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
  Prospecto,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanProspectoController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Array of Plan has many Prospecto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Prospecto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Prospecto>,
  ): Promise<Prospecto[]> {
    return this.planRepository.prospectos(id).find(filter);
  }

  @post('/plans/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prospecto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospecto, {
            title: 'NewProspectoInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) prospecto: Omit<Prospecto, 'id'>,
  ): Promise<Prospecto> {
    return this.planRepository.prospectos(id).create(prospecto);
  }

  @patch('/plans/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Plan.Prospecto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospecto, {partial: true}),
        },
      },
    })
    prospecto: Partial<Prospecto>,
    @param.query.object('where', getWhereSchemaFor(Prospecto)) where?: Where<Prospecto>,
  ): Promise<Count> {
    return this.planRepository.prospectos(id).patch(prospecto, where);
  }

  @del('/plans/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Plan.Prospecto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prospecto)) where?: Where<Prospecto>,
  ): Promise<Count> {
    return this.planRepository.prospectos(id).delete(where);
  }
}
