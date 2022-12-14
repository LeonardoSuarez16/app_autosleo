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
  Producto,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanProductoController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Plan has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.planRepository.productos(id).find(filter);
  }

  @post('/plans/{id}/productos', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInPlan',
            exclude: ['codigo'],
            optional: ['planId']
          }),
        },
      },
    }) producto: Omit<Producto, 'codigo'>,
  ): Promise<Producto> {
    return this.planRepository.productos(id).create(producto);
  }

  @patch('/plans/{id}/productos', {
    responses: {
      '200': {
        description: 'Plan.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.planRepository.productos(id).patch(producto, where);
  }

  @del('/plans/{id}/productos', {
    responses: {
      '200': {
        description: 'Plan.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.planRepository.productos(id).delete(where);
  }
}
