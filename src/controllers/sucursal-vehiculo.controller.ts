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
  Vehiculo,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalVehiculoController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.sucursalRepository.vehiculos(id).find(filter);
  }

  @post('/sucursals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInSucursal',
            exclude: ['placa'],
            optional: ['sucursalId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'placa'>,
  ): Promise<Vehiculo> {
    return this.sucursalRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/sucursals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Sucursal.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.sucursalRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/sucursals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Sucursal.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.sucursalRepository.vehiculos(id).delete(where);
  }
}
