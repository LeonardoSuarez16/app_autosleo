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
  Sucursal,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanSucursalController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
  ): Promise<Sucursal> {
    return this.planRepository.sucursal(id);
  }
}
