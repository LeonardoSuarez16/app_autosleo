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
  Capacitacion,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioCapacitacionController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Capacitacion',
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
    return this.usuarioRepository.capacitacions(id).find(filter);
  }

  @post('/usuarios/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capacitacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capacitacion, {
            title: 'NewCapacitacionInUsuario',
            exclude: ['nombre'],
            optional: ['usuarioId']
          }),
        },
      },
    }) capacitacion: Omit<Capacitacion, 'nombre'>,
  ): Promise<Capacitacion> {
    return this.usuarioRepository.capacitacions(id).create(capacitacion);
  }

  @patch('/usuarios/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Usuario.Capacitacion PATCH success count',
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
    return this.usuarioRepository.capacitacions(id).patch(capacitacion, where);
  }

  @del('/usuarios/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Usuario.Capacitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Capacitacion)) where?: Where<Capacitacion>,
  ): Promise<Count> {
    return this.usuarioRepository.capacitacions(id).delete(where);
  }
}
