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
  Colaborador,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoColaboradorController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Colaborador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Colaborador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Colaborador>,
  ): Promise<Colaborador[]> {
    return this.vehiculoRepository.colaboradors(id).find(filter);
  }

  @post('/vehiculos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Colaborador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {
            title: 'NewColaboradorInVehiculo',
            exclude: ['cargo'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) colaborador: Omit<Colaborador, 'cargo'>,
  ): Promise<Colaborador> {
    return this.vehiculoRepository.colaboradors(id).create(colaborador);
  }

  @patch('/vehiculos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Vehiculo.Colaborador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {partial: true}),
        },
      },
    })
    colaborador: Partial<Colaborador>,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.vehiculoRepository.colaboradors(id).patch(colaborador, where);
  }

  @del('/vehiculos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Vehiculo.Colaborador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.vehiculoRepository.colaboradors(id).delete(where);
  }
}
