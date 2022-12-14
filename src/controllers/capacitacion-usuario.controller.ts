import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Capacitacion,
  Usuario,
} from '../models';
import {CapacitacionRepository} from '../repositories';

export class CapacitacionUsuarioController {
  constructor(
    @repository(CapacitacionRepository)
    public capacitacionRepository: CapacitacionRepository,
  ) { }

  @get('/capacitacions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Capacitacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Capacitacion.prototype.nombre,
  ): Promise<Usuario> {
    return this.capacitacionRepository.usuario(id);
  }
}
