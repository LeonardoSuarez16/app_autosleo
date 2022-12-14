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
  Servicio,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioServicioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Servicio',
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
    return this.usuarioRepository.servicios(id).find(filter);
  }

  @post('/usuarios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInUsuario',
            exclude: ['nombre'],
            optional: ['usuarioId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'nombre'>,
  ): Promise<Servicio> {
    return this.usuarioRepository.servicios(id).create(servicio);
  }

  @patch('/usuarios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Usuario.Servicio PATCH success count',
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
    return this.usuarioRepository.servicios(id).patch(servicio, where);
  }

  @del('/usuarios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Usuario.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.usuarioRepository.servicios(id).delete(where);
  }
}
