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
  Capacitacion,
  Colaborador,
} from '../models';
import {CapacitacionRepository} from '../repositories';

export class CapacitacionColaboradorController {
  constructor(
    @repository(CapacitacionRepository) protected capacitacionRepository: CapacitacionRepository,
  ) { }

  @get('/capacitacions/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Array of Capacitacion has many Colaborador',
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
    return this.capacitacionRepository.colaboradors(id).find(filter);
  }

  @post('/capacitacions/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Capacitacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Colaborador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Capacitacion.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {
            title: 'NewColaboradorInCapacitacion',
            exclude: ['cargo'],
            optional: ['capacitacionId']
          }),
        },
      },
    }) colaborador: Omit<Colaborador, 'cargo'>,
  ): Promise<Colaborador> {
    return this.capacitacionRepository.colaboradors(id).create(colaborador);
  }

  @patch('/capacitacions/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Capacitacion.Colaborador PATCH success count',
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
    return this.capacitacionRepository.colaboradors(id).patch(colaborador, where);
  }

  @del('/capacitacions/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Capacitacion.Colaborador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.capacitacionRepository.colaboradors(id).delete(where);
  }
}
