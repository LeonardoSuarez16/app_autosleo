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
  Colaborador,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalColaboradorController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Colaborador',
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
    return this.sucursalRepository.colaboradors(id).find(filter);
  }

  @post('/sucursals/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Colaborador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {
            title: 'NewColaboradorInSucursal',
            exclude: ['cargo'],
            optional: ['sucursalId']
          }),
        },
      },
    }) colaborador: Omit<Colaborador, 'cargo'>,
  ): Promise<Colaborador> {
    return this.sucursalRepository.colaboradors(id).create(colaborador);
  }

  @patch('/sucursals/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Sucursal.Colaborador PATCH success count',
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
    return this.sucursalRepository.colaboradors(id).patch(colaborador, where);
  }

  @del('/sucursals/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Sucursal.Colaborador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.sucursalRepository.colaboradors(id).delete(where);
  }
}
