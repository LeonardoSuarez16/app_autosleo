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
  Producto,
  Plan,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoPlanController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Producto has many Plan',
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
    return this.productoRepository.plans(id).find(filter);
  }

  @post('/productos/{id}/plans', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInProducto',
            exclude: ['nombre_del_plan'],
            optional: ['productoId']
          }),
        },
      },
    }) plan: Omit<Plan, 'nombre_del_plan'>,
  ): Promise<Plan> {
    return this.productoRepository.plans(id).create(plan);
  }

  @patch('/productos/{id}/plans', {
    responses: {
      '200': {
        description: 'Producto.Plan PATCH success count',
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
    return this.productoRepository.plans(id).patch(plan, where);
  }

  @del('/productos/{id}/plans', {
    responses: {
      '200': {
        description: 'Producto.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.productoRepository.plans(id).delete(where);
  }
}
