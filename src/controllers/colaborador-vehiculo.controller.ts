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
  Vehiculo,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorVehiculoController {
  constructor(
    @repository(ColaboradorRepository) protected colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Colaborador has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.colaboradorRepository.vehiculos(id).find(filter);
  }

  @post('/colaboradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Colaborador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInColaborador',
            exclude: ['placa'],
            optional: ['colaboradorId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'placa'>,
  ): Promise<Vehiculo> {
    return this.colaboradorRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/colaboradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Colaborador.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.colaboradorRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/colaboradors/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Colaborador.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.colaboradorRepository.vehiculos(id).delete(where);
  }
}
