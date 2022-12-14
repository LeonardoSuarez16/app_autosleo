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
  Usuario,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalUsuarioController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.sucursalRepository.usuarios(id).find(filter);
  }

  @post('/sucursals/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInSucursal',
            exclude: ['documento'],
            optional: ['sucursalId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'documento'>,
  ): Promise<Usuario> {
    return this.sucursalRepository.usuarios(id).create(usuario);
  }

  @patch('/sucursals/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Sucursal.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.sucursalRepository.usuarios(id).patch(usuario, where);
  }

  @del('/sucursals/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Sucursal.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.sucursalRepository.usuarios(id).delete(where);
  }
}
