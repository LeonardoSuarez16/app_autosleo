import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plan,
  Vehiculo,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanVehiculoController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
  ): Promise<Vehiculo> {
    return this.planRepository.vehiculo(id);
  }
}
