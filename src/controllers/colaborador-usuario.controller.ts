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
  Colaborador,
  Usuario,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorUsuarioController {
  constructor(
    @repository(ColaboradorRepository) protected colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Colaborador has many Usuario',
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
    return this.colaboradorRepository.usuarios(id).find(filter);
  }

  @post('/colaboradors/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Colaborador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInColaborador',
            exclude: ['documento'],
            optional: ['colaboradorId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'documento'>,
  ): Promise<Usuario> {
    return this.colaboradorRepository.usuarios(id).create(usuario);
  }

  @patch('/colaboradors/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Colaborador.Usuario PATCH success count',
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
    return this.colaboradorRepository.usuarios(id).patch(usuario, where);
  }

  @del('/colaboradors/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Colaborador.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.colaboradorRepository.usuarios(id).delete(where);
  }
}
