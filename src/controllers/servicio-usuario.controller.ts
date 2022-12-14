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
  Usuario,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioUsuarioController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Servicio.prototype.nombre,
  ): Promise<Usuario> {
    return this.servicioRepository.usuario(id);
  }
}
