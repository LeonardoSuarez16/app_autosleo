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
  Prospecto,
  Producto,
} from '../models';
import {ProspectoRepository} from '../repositories';

export class ProspectoProductoController {
  constructor(
    @repository(ProspectoRepository) protected prospectoRepository: ProspectoRepository,
  ) { }

  @get('/prospectos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Prospecto has many Producto',
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
    return this.prospectoRepository.productos(id).find(filter);
  }

  @post('/prospectos/{id}/productos', {
    responses: {
      '200': {
        description: 'Prospecto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Prospecto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInProspecto',
            exclude: ['codigo'],
            optional: ['prospectoId']
          }),
        },
      },
    }) producto: Omit<Producto, 'codigo'>,
  ): Promise<Producto> {
    return this.prospectoRepository.productos(id).create(producto);
  }

  @patch('/prospectos/{id}/productos', {
    responses: {
      '200': {
        description: 'Prospecto.Producto PATCH success count',
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
    return this.prospectoRepository.productos(id).patch(producto, where);
  }

  @del('/prospectos/{id}/productos', {
    responses: {
      '200': {
        description: 'Prospecto.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.prospectoRepository.productos(id).delete(where);
  }
}
