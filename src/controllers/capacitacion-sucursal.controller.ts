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
  Sucursal,
} from '../models';
import {CapacitacionRepository} from '../repositories';

export class CapacitacionSucursalController {
  constructor(
    @repository(CapacitacionRepository) protected capacitacionRepository: CapacitacionRepository,
  ) { }

  @get('/capacitacions/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Array of Capacitacion has many Sucursal',
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
    return this.capacitacionRepository.sucursals(id).find(filter);
  }

  @post('/capacitacions/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Capacitacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Capacitacion.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInCapacitacion',
            exclude: ['nombre'],
            optional: ['capacitacionId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'nombre'>,
  ): Promise<Sucursal> {
    return this.capacitacionRepository.sucursals(id).create(sucursal);
  }

  @patch('/capacitacions/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Capacitacion.Sucursal PATCH success count',
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
    return this.capacitacionRepository.sucursals(id).patch(sucursal, where);
  }

  @del('/capacitacions/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Capacitacion.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.capacitacionRepository.sucursals(id).delete(where);
  }
}
