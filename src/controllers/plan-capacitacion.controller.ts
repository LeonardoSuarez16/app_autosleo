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
  Capacitacion,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanCapacitacionController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Array of Plan has many Capacitacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Capacitacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Capacitacion>,
  ): Promise<Capacitacion[]> {
    return this.planRepository.capacitacions(id).find(filter);
  }

  @post('/plans/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capacitacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capacitacion, {
            title: 'NewCapacitacionInPlan',
            exclude: ['nombre'],
            optional: ['planId']
          }),
        },
      },
    }) capacitacion: Omit<Capacitacion, 'nombre'>,
  ): Promise<Capacitacion> {
    return this.planRepository.capacitacions(id).create(capacitacion);
  }

  @patch('/plans/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Plan.Capacitacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capacitacion, {partial: true}),
        },
      },
    })
    capacitacion: Partial<Capacitacion>,
    @param.query.object('where', getWhereSchemaFor(Capacitacion)) where?: Where<Capacitacion>,
  ): Promise<Count> {
    return this.planRepository.capacitacions(id).patch(capacitacion, where);
  }

  @del('/plans/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Plan.Capacitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Capacitacion)) where?: Where<Capacitacion>,
  ): Promise<Count> {
    return this.planRepository.capacitacions(id).delete(where);
  }
}
