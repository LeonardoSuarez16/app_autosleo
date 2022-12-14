import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Sucursal,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioSucursalController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Usuario.prototype.documento,
  ): Promise<Sucursal> {
    return this.usuarioRepository.sucursal(id);
  }
}
