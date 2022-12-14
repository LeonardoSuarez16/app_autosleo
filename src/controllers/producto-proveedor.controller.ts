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
  Proveedor,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProveedorController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Array of Producto has many Proveedor',
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
    return this.productoRepository.proveedors(id).find(filter);
  }

  @post('/productos/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedorInProducto',
            exclude: ['nit'],
            optional: ['productoId']
          }),
        },
      },
    }) proveedor: Omit<Proveedor, 'nit'>,
  ): Promise<Proveedor> {
    return this.productoRepository.proveedors(id).create(proveedor);
  }

  @patch('/productos/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Producto.Proveedor PATCH success count',
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
    return this.productoRepository.proveedors(id).patch(proveedor, where);
  }

  @del('/productos/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Producto.Proveedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.productoRepository.proveedors(id).delete(where);
  }
}
