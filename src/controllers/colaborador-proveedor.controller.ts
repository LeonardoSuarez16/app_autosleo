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
  Proveedor,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorProveedorController {
  constructor(
    @repository(ColaboradorRepository) protected colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Array of Colaborador has many Proveedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.colaboradorRepository.proveedors(id).find(filter);
  }

  @post('/colaboradors/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Colaborador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedorInColaborador',
            exclude: ['nit'],
            optional: ['colaboradorId']
          }),
        },
      },
    }) proveedor: Omit<Proveedor, 'nit'>,
  ): Promise<Proveedor> {
    return this.colaboradorRepository.proveedors(id).create(proveedor);
  }

  @patch('/colaboradors/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Colaborador.Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Partial<Proveedor>,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.colaboradorRepository.proveedors(id).patch(proveedor, where);
  }

  @del('/colaboradors/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Colaborador.Proveedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.colaboradorRepository.proveedors(id).delete(where);
  }
}
