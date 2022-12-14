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
  Usuario,
  Prospecto,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioProspectoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/prospecto', {
    responses: {
      '200': {
        description: 'Usuario has one Prospecto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prospecto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Prospecto>,
  ): Promise<Prospecto> {
    return this.usuarioRepository.prospecto(id).get(filter);
  }

  @post('/usuarios/{id}/prospecto', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prospecto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospecto, {
            title: 'NewProspectoInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) prospecto: Omit<Prospecto, 'id'>,
  ): Promise<Prospecto> {
    return this.usuarioRepository.prospecto(id).create(prospecto);
  }

  @patch('/usuarios/{id}/prospecto', {
    responses: {
      '200': {
        description: 'Usuario.Prospecto PATCH success count',
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
    return this.usuarioRepository.prospecto(id).patch(prospecto, where);
  }

  @del('/usuarios/{id}/prospecto', {
    responses: {
      '200': {
        description: 'Usuario.Prospecto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prospecto)) where?: Where<Prospecto>,
  ): Promise<Count> {
    return this.usuarioRepository.prospecto(id).delete(where);
  }
}
