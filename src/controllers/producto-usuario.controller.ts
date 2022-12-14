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
  Usuario,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoUsuarioController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Producto.prototype.codigo,
  ): Promise<Usuario> {
    return this.productoRepository.usuario(id);
  }
}
