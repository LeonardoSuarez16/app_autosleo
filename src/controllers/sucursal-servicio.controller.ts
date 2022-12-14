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
  Servicio,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalServicioController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Servicio',
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
    return this.sucursalRepository.servicios(id).find(filter);
  }

  @post('/sucursals/{id}/servicios', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInSucursal',
            exclude: ['nombre'],
            optional: ['sucursalId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'nombre'>,
  ): Promise<Servicio> {
    return this.sucursalRepository.servicios(id).create(servicio);
  }

  @patch('/sucursals/{id}/servicios', {
    responses: {
      '200': {
        description: 'Sucursal.Servicio PATCH success count',
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
    return this.sucursalRepository.servicios(id).patch(servicio, where);
  }

  @del('/sucursals/{id}/servicios', {
    responses: {
      '200': {
        description: 'Sucursal.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.sucursalRepository.servicios(id).delete(where);
  }
}
