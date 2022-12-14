import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Vehiculo,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoVehiculoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Producto.prototype.codigo,
  ): Promise<Vehiculo> {
    return this.productoRepository.vehiculo(id);
  }
}
