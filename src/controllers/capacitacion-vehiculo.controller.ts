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
  Capacitacion,
  Vehiculo,
} from '../models';
import {CapacitacionRepository} from '../repositories';

export class CapacitacionVehiculoController {
  constructor(
    @repository(CapacitacionRepository) protected capacitacionRepository: CapacitacionRepository,
  ) { }

  @get('/capacitacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Capacitacion has many Vehiculo',
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
    return this.capacitacionRepository.vehiculos(id).find(filter);
  }

  @post('/capacitacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Capacitacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Capacitacion.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInCapacitacion',
            exclude: ['placa'],
            optional: ['capacitacionId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'placa'>,
  ): Promise<Vehiculo> {
    return this.capacitacionRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/capacitacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Capacitacion.Vehiculo PATCH success count',
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
    return this.capacitacionRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/capacitacions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Capacitacion.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.capacitacionRepository.vehiculos(id).delete(where);
  }
}
