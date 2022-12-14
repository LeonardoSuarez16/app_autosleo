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
  Proveedor,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanProveedorController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Array of Plan has many Proveedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.planRepository.proveedors(id).find(filter);
  }

  @post('/plans/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedorInPlan',
            exclude: ['nit'],
            optional: ['planId']
          }),
        },
      },
    }) proveedor: Omit<Proveedor, 'nit'>,
  ): Promise<Proveedor> {
    return this.planRepository.proveedors(id).create(proveedor);
  }

  @patch('/plans/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Plan.Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Partial<Proveedor>,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.planRepository.proveedors(id).patch(proveedor, where);
  }

  @del('/plans/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Plan.Proveedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.planRepository.proveedors(id).delete(where);
  }
}
