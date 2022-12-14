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
  Capacitacion,
  Plan,
} from '../models';
import {CapacitacionRepository} from '../repositories';

export class CapacitacionPlanController {
  constructor(
    @repository(CapacitacionRepository) protected capacitacionRepository: CapacitacionRepository,
  ) { }

  @get('/capacitacions/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Capacitacion has many Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.capacitacionRepository.plans(id).find(filter);
  }

  @post('/capacitacions/{id}/plans', {
    responses: {
      '200': {
        description: 'Capacitacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Capacitacion.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInCapacitacion',
            exclude: ['nombre_del_plan'],
            optional: ['capacitacionId']
          }),
        },
      },
    }) plan: Omit<Plan, 'nombre_del_plan'>,
  ): Promise<Plan> {
    return this.capacitacionRepository.plans(id).create(plan);
  }

  @patch('/capacitacions/{id}/plans', {
    responses: {
      '200': {
        description: 'Capacitacion.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.capacitacionRepository.plans(id).patch(plan, where);
  }

  @del('/capacitacions/{id}/plans', {
    responses: {
      '200': {
        description: 'Capacitacion.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.capacitacionRepository.plans(id).delete(where);
  }
}
