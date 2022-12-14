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
  Capacitacion,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorCapacitacionController {
  constructor(
    @repository(ColaboradorRepository) protected colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Array of Colaborador has many Capacitacion',
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
    return this.colaboradorRepository.capacitacions(id).find(filter);
  }

  @post('/colaboradors/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Colaborador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capacitacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capacitacion, {
            title: 'NewCapacitacionInColaborador',
            exclude: ['nombre'],
            optional: ['colaboradorId']
          }),
        },
      },
    }) capacitacion: Omit<Capacitacion, 'nombre'>,
  ): Promise<Capacitacion> {
    return this.colaboradorRepository.capacitacions(id).create(capacitacion);
  }

  @patch('/colaboradors/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Colaborador.Capacitacion PATCH success count',
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
    return this.colaboradorRepository.capacitacions(id).patch(capacitacion, where);
  }

  @del('/colaboradors/{id}/capacitacions', {
    responses: {
      '200': {
        description: 'Colaborador.Capacitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Capacitacion)) where?: Where<Capacitacion>,
  ): Promise<Count> {
    return this.colaboradorRepository.capacitacions(id).delete(where);
  }
}
