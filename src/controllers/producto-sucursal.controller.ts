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
  Sucursal,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoSucursalController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Array of Producto has many Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sucursal>,
  ): Promise<Sucursal[]> {
    return this.productoRepository.sucursals(id).find(filter);
  }

  @post('/productos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInProducto',
            exclude: ['nombre'],
            optional: ['productoId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'nombre'>,
  ): Promise<Sucursal> {
    return this.productoRepository.sucursals(id).create(sucursal);
  }

  @patch('/productos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Producto.Sucursal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Partial<Sucursal>,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.productoRepository.sucursals(id).patch(sucursal, where);
  }

  @del('/productos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Producto.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.productoRepository.sucursals(id).delete(where);
  }
}
