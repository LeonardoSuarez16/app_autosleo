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
  Colaborador,
} from '../models';
import {ProspectoRepository} from '../repositories';

export class ProspectoColaboradorController {
  constructor(
    @repository(ProspectoRepository) protected prospectoRepository: ProspectoRepository,
  ) { }

  @get('/prospectos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Array of Prospecto has many Colaborador',
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
    return this.prospectoRepository.colaboradors(id).find(filter);
  }

  @post('/prospectos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Prospecto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Colaborador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Prospecto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {
            title: 'NewColaboradorInProspecto',
            exclude: ['cargo'],
            optional: ['prospectoId']
          }),
        },
      },
    }) colaborador: Omit<Colaborador, 'cargo'>,
  ): Promise<Colaborador> {
    return this.prospectoRepository.colaboradors(id).create(colaborador);
  }

  @patch('/prospectos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Prospecto.Colaborador PATCH success count',
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
    return this.prospectoRepository.colaboradors(id).patch(colaborador, where);
  }

  @del('/prospectos/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Prospecto.Colaborador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.prospectoRepository.colaboradors(id).delete(where);
  }
}
