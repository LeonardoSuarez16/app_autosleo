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
  Prospecto,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorProspectoController {
  constructor(
    @repository(ColaboradorRepository) protected colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Array of Colaborador has many Prospecto',
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
    return this.colaboradorRepository.prospectos(id).find(filter);
  }

  @post('/colaboradors/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Colaborador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prospecto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prospecto, {
            title: 'NewProspectoInColaborador',
            exclude: ['id'],
            optional: ['colaboradorId']
          }),
        },
      },
    }) prospecto: Omit<Prospecto, 'id'>,
  ): Promise<Prospecto> {
    return this.colaboradorRepository.prospectos(id).create(prospecto);
  }

  @patch('/colaboradors/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Colaborador.Prospecto PATCH success count',
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
    return this.colaboradorRepository.prospectos(id).patch(prospecto, where);
  }

  @del('/colaboradors/{id}/prospectos', {
    responses: {
      '200': {
        description: 'Colaborador.Prospecto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Prospecto)) where?: Where<Prospecto>,
  ): Promise<Count> {
    return this.colaboradorRepository.prospectos(id).delete(where);
  }
}
