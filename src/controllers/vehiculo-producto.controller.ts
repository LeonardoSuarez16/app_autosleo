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
  Vehiculo,
  Producto,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoProductoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Producto',
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
    return this.vehiculoRepository.productos(id).find(filter);
  }

  @post('/vehiculos/{id}/productos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInVehiculo',
            exclude: ['codigo'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) producto: Omit<Producto, 'codigo'>,
  ): Promise<Producto> {
    return this.vehiculoRepository.productos(id).create(producto);
  }

  @patch('/vehiculos/{id}/productos', {
    responses: {
      '200': {
        description: 'Vehiculo.Producto PATCH success count',
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
    return this.vehiculoRepository.productos(id).patch(producto, where);
  }

  @del('/vehiculos/{id}/productos', {
    responses: {
      '200': {
        description: 'Vehiculo.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.vehiculoRepository.productos(id).delete(where);
  }
}
