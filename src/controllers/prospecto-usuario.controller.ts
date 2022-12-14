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
  Prospecto,
  Usuario,
} from '../models';
import {ProspectoRepository} from '../repositories';

export class ProspectoUsuarioController {
  constructor(
    @repository(ProspectoRepository) protected prospectoRepository: ProspectoRepository,
  ) { }

  @get('/prospectos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Prospecto has one Usuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario> {
    return this.prospectoRepository.usuario(id).get(filter);
  }

  @post('/prospectos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Prospecto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Prospecto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInProspecto',
            exclude: ['documento'],
            optional: ['prospectoId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'documento'>,
  ): Promise<Usuario> {
    return this.prospectoRepository.usuario(id).create(usuario);
  }

  @patch('/prospectos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Prospecto.Usuario PATCH success count',
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
    return this.prospectoRepository.usuario(id).patch(usuario, where);
  }

  @del('/prospectos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Prospecto.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.prospectoRepository.usuario(id).delete(where);
  }
}
