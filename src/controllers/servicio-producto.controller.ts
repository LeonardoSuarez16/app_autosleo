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
  Servicio,
  Producto,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioProductoController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Servicio has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.servicioRepository.productos(id).find(filter);
  }

  @post('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInServicio',
            exclude: ['codigo'],
            optional: ['servicioId']
          }),
        },
      },
    }) producto: Omit<Producto, 'codigo'>,
  ): Promise<Producto> {
    return this.servicioRepository.productos(id).create(producto);
  }

  @patch('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Servicio.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.servicioRepository.productos(id).patch(producto, where);
  }

  @del('/servicios/{id}/productos', {
    responses: {
      '200': {
        description: 'Servicio.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.servicioRepository.productos(id).delete(where);
  }
}
