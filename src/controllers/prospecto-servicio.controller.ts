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
  Servicio,
} from '../models';
import {ProspectoRepository} from '../repositories';

export class ProspectoServicioController {
  constructor(
    @repository(ProspectoRepository) protected prospectoRepository: ProspectoRepository,
  ) { }

  @get('/prospectos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Prospecto has many Servicio',
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
    return this.prospectoRepository.servicios(id).find(filter);
  }

  @post('/prospectos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Prospecto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Prospecto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInProspecto',
            exclude: ['nombre'],
            optional: ['prospectoId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'nombre'>,
  ): Promise<Servicio> {
    return this.prospectoRepository.servicios(id).create(servicio);
  }

  @patch('/prospectos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Prospecto.Servicio PATCH success count',
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
    return this.prospectoRepository.servicios(id).patch(servicio, where);
  }

  @del('/prospectos/{id}/servicios', {
    responses: {
      '200': {
        description: 'Prospecto.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.prospectoRepository.servicios(id).delete(where);
  }
}
