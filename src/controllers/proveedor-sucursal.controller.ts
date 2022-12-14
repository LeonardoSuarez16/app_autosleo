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
  Sucursal,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorSucursalController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sucursal>,
  ): Promise<Sucursal[]> {
    return this.proveedorRepository.sucursals(id).find(filter);
  }

  @post('/proveedors/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.nit,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInProveedor',
            exclude: ['nombre'],
            optional: ['proveedorId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'nombre'>,
  ): Promise<Sucursal> {
    return this.proveedorRepository.sucursals(id).create(sucursal);
  }

  @patch('/proveedors/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Proveedor.Sucursal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Partial<Sucursal>,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.proveedorRepository.sucursals(id).patch(sucursal, where);
  }

  @del('/proveedors/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Proveedor.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.proveedorRepository.sucursals(id).delete(where);
  }
}
