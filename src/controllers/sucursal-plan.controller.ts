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
  Sucursal,
  Plan,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalPlanController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Plan',
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
    return this.sucursalRepository.plans(id).find(filter);
  }

  @post('/sucursals/{id}/plans', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInSucursal',
            exclude: ['nombre_del_plan'],
            optional: ['sucursalId']
          }),
        },
      },
    }) plan: Omit<Plan, 'nombre_del_plan'>,
  ): Promise<Plan> {
    return this.sucursalRepository.plans(id).create(plan);
  }

  @patch('/sucursals/{id}/plans', {
    responses: {
      '200': {
        description: 'Sucursal.Plan PATCH success count',
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
    return this.sucursalRepository.plans(id).patch(plan, where);
  }

  @del('/sucursals/{id}/plans', {
    responses: {
      '200': {
        description: 'Sucursal.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.sucursalRepository.plans(id).delete(where);
  }
}
