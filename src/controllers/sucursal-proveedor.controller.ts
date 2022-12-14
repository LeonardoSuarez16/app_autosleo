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
  Sucursal,
  Proveedor,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalProveedorController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Proveedor',
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
    return this.sucursalRepository.proveedors(id).find(filter);
  }

  @post('/sucursals/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedorInSucursal',
            exclude: ['nit'],
            optional: ['sucursalId']
          }),
        },
      },
    }) proveedor: Omit<Proveedor, 'nit'>,
  ): Promise<Proveedor> {
    return this.sucursalRepository.proveedors(id).create(proveedor);
  }

  @patch('/sucursals/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Sucursal.Proveedor PATCH success count',
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
    return this.sucursalRepository.proveedors(id).patch(proveedor, where);
  }

  @del('/sucursals/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Sucursal.Proveedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.sucursalRepository.proveedors(id).delete(where);
  }
}
