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
  Proveedor,
  Colaborador,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorColaboradorController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Colaborador',
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
    return this.proveedorRepository.colaboradors(id).find(filter);
  }

  @post('/proveedors/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Colaborador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.nit,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Colaborador, {
            title: 'NewColaboradorInProveedor',
            exclude: ['cargo'],
            optional: ['proveedorId']
          }),
        },
      },
    }) colaborador: Omit<Colaborador, 'cargo'>,
  ): Promise<Colaborador> {
    return this.proveedorRepository.colaboradors(id).create(colaborador);
  }

  @patch('/proveedors/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Proveedor.Colaborador PATCH success count',
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
    return this.proveedorRepository.colaboradors(id).patch(colaborador, where);
  }

  @del('/proveedors/{id}/colaboradors', {
    responses: {
      '200': {
        description: 'Proveedor.Colaborador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Colaborador)) where?: Where<Colaborador>,
  ): Promise<Count> {
    return this.proveedorRepository.colaboradors(id).delete(where);
  }
}
