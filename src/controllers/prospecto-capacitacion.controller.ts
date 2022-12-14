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
  Capacitacion,
} from '../models';
import {ProspectoRepository} from '../repositories';

export class ProspectoCapacitacionController {
  constructor(
    @repository(ProspectoRepository) protected prospectoRepository: ProspectoRepository,
  ) { }

  @get('/prospectos/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Array of Prospecto has many Capacitacion',
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
    return this.prospectoRepository.capacitacions(id).find(filter);
  }

  @post('/prospectos/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Prospecto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capacitacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Prospecto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capacitacion, {
            title: 'NewCapacitacionInProspecto',
            exclude: ['nombre'],
            optional: ['prospectoId']
          }),
        },
      },
    }) capacitacion: Omit<Capacitacion, 'nombre'>,
  ): Promise<Capacitacion> {
    return this.prospectoRepository.capacitacions(id).create(capacitacion);
  }

  @patch('/prospectos/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Prospecto.Capacitacion PATCH success count',
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
    return this.prospectoRepository.capacitacions(id).patch(capacitacion, where);
  }

  @del('/prospectos/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Prospecto.Capacitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Capacitacion)) where?: Where<Capacitacion>,
  ): Promise<Count> {
    return this.prospectoRepository.capacitacions(id).delete(where);
  }
}
