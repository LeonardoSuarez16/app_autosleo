import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Vehiculo,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioVehiculoController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Servicio.prototype.nombre,
  ): Promise<Vehiculo> {
    return this.servicioRepository.vehiculo(id);
  }
}
