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
  Producto,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalProductoController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Producto',
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
    return this.sucursalRepository.productos(id).find(filter);
  }

  @post('/sucursals/{id}/productos', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInSucursal',
            exclude: ['codigo'],
            optional: ['sucursalId']
          }),
        },
      },
    }) producto: Omit<Producto, 'codigo'>,
  ): Promise<Producto> {
    return this.sucursalRepository.productos(id).create(producto);
  }

  @patch('/sucursals/{id}/productos', {
    responses: {
      '200': {
        description: 'Sucursal.Producto PATCH success count',
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
    return this.sucursalRepository.productos(id).patch(producto, where);
  }

  @del('/sucursals/{id}/productos', {
    responses: {
      '200': {
        description: 'Sucursal.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.sucursalRepository.productos(id).delete(where);
  }
}
