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
  Servicio,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorServicioController {
  constructor(
    @repository(ColaboradorRepository) protected colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Colaborador has many Servicio',
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
    return this.colaboradorRepository.servicios(id).find(filter);
  }

  @post('/colaboradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Colaborador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInColaborador',
            exclude: ['nombre'],
            optional: ['colaboradorId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'nombre'>,
  ): Promise<Servicio> {
    return this.colaboradorRepository.servicios(id).create(servicio);
  }

  @patch('/colaboradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Colaborador.Servicio PATCH success count',
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
    return this.colaboradorRepository.servicios(id).patch(servicio, where);
  }

  @del('/colaboradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Colaborador.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.colaboradorRepository.servicios(id).delete(where);
  }
}
