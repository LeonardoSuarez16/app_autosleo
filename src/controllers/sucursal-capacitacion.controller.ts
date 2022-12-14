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
  Capacitacion,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalCapacitacionController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Capacitacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Capacitacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Capacitacion>,
  ): Promise<Capacitacion[]> {
    return this.sucursalRepository.capacitacions(id).find(filter);
  }

  @post('/sucursals/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capacitacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capacitacion, {
            title: 'NewCapacitacionInSucursal',
            exclude: ['nombre'],
            optional: ['sucursalId']
          }),
        },
      },
    }) capacitacion: Omit<Capacitacion, 'nombre'>,
  ): Promise<Capacitacion> {
    return this.sucursalRepository.capacitacions(id).create(capacitacion);
  }

  @patch('/sucursals/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Sucursal.Capacitacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capacitacion, {partial: true}),
        },
      },
    })
    capacitacion: Partial<Capacitacion>,
    @param.query.object('where', getWhereSchemaFor(Capacitacion)) where?: Where<Capacitacion>,
  ): Promise<Count> {
    return this.sucursalRepository.capacitacions(id).patch(capacitacion, where);
  }

  @del('/sucursals/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Sucursal.Capacitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Capacitacion)) where?: Where<Capacitacion>,
  ): Promise<Count> {
    return this.sucursalRepository.capacitacions(id).delete(where);
  }
}
