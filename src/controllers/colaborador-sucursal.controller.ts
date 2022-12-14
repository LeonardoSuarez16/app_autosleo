import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Colaborador,
  Sucursal,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorSucursalController {
  constructor(
    @repository(ColaboradorRepository)
    public colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Colaborador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
  ): Promise<Sucursal> {
    return this.colaboradorRepository.sucursal(id);
  }
}
