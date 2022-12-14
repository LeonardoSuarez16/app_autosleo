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
  Sucursal,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoSucursalController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Sucursal',
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
    return this.vehiculoRepository.sucursals(id).find(filter);
  }

  @post('/vehiculos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInVehiculo',
            exclude: ['nombre'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'nombre'>,
  ): Promise<Sucursal> {
    return this.vehiculoRepository.sucursals(id).create(sucursal);
  }

  @patch('/vehiculos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Vehiculo.Sucursal PATCH success count',
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
    return this.vehiculoRepository.sucursals(id).patch(sucursal, where);
  }

  @del('/vehiculos/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Vehiculo.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.vehiculoRepository.sucursals(id).delete(where);
  }
}
