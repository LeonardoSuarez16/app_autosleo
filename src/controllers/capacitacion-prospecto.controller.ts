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
  Prospecto,
} from '../models';
import {CapacitacionRepository} from '../repositories';

export class CapacitacionProspectoController {
  constructor(
    @repository(CapacitacionRepository) protected capacitacionRepository: CapacitacionRepository,
  ) { }

  @get('/capacitacions/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Array of Capacitacion has many Prospecto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Prospecto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Prospecto>,
  ): Promise<Prospecto[]> {
    return this.capacitacionRepository.prospectos(id).find(filter);
  }

  @post('/capacitacions/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Capacitacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prospecto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Capacitacion.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospecto, {
            title: 'NewProspectoInCapacitacion',
            exclude: ['id'],
            optional: ['capacitacionId']
          }),
        },
      },
    }) prospecto: Omit<Prospecto, 'id'>,
  ): Promise<Prospecto> {
    return this.capacitacionRepository.prospectos(id).create(prospecto);
  }

  @patch('/capacitacions/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Capacitacion.Prospecto PATCH success count',
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
    return this.capacitacionRepository.prospectos(id).patch(prospecto, where);
  }

  @del('/capacitacions/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Capacitacion.Prospecto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prospecto)) where?: Where<Prospecto>,
  ): Promise<Count> {
    return this.capacitacionRepository.prospectos(id).delete(where);
  }
}
