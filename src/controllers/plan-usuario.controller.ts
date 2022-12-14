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
  Usuario,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanUsuarioController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Plan.prototype.nombre_del_plan,
  ): Promise<Usuario> {
    return this.planRepository.usuario(id);
  }
}
