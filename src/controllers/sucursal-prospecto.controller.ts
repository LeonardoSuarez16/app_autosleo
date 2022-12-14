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
  Prospecto,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalProspectoController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Prospecto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Prospecto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Prospecto>,
  ): Promise<Prospecto[]> {
    return this.sucursalRepository.prospectos(id).find(filter);
  }

  @post('/sucursals/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prospecto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospecto, {
            title: 'NewProspectoInSucursal',
            exclude: ['id'],
            optional: ['sucursalId']
          }),
        },
      },
    }) prospecto: Omit<Prospecto, 'id'>,
  ): Promise<Prospecto> {
    return this.sucursalRepository.prospectos(id).create(prospecto);
  }

  @patch('/sucursals/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Sucursal.Prospecto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospecto, {partial: true}),
        },
      },
    })
    prospecto: Partial<Prospecto>,
    @param.query.object('where', getWhereSchemaFor(Prospecto)) where?: Where<Prospecto>,
  ): Promise<Count> {
    return this.sucursalRepository.prospectos(id).patch(prospecto, where);
  }

  @del('/sucursals/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Sucursal.Prospecto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prospecto)) where?: Where<Prospecto>,
  ): Promise<Count> {
    return this.sucursalRepository.prospectos(id).delete(where);
  }
}
