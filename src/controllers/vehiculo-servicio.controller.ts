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
  Servicio,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoServicioController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.vehiculoRepository.servicios(id).find(filter);
  }

  @post('/vehiculos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInVehiculo',
            exclude: ['nombre'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'nombre'>,
  ): Promise<Servicio> {
    return this.vehiculoRepository.servicios(id).create(servicio);
  }

  @patch('/vehiculos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Vehiculo.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.vehiculoRepository.servicios(id).patch(servicio, where);
  }

  @del('/vehiculos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Vehiculo.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.vehiculoRepository.servicios(id).delete(where);
  }
}
