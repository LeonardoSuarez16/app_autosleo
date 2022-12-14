import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbAutosleoDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Usuario, Sucursal, Servicio, Producto, Plan, Colaborador} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {SucursalRepository} from './sucursal.repository';
import {ServicioRepository} from './servicio.repository';
import {ProductoRepository} from './producto.repository';
import {PlanRepository} from './plan.repository';
import {ColaboradorRepository} from './colaborador.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.placa,
  VehiculoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Vehiculo.prototype.placa>;

  public readonly sucursals: HasManyRepositoryFactory<Sucursal, typeof Vehiculo.prototype.placa>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Vehiculo.prototype.placa>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Vehiculo.prototype.placa>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Vehiculo.prototype.placa>;

  public readonly colaboradors: HasManyRepositoryFactory<Colaborador, typeof Vehiculo.prototype.placa>;

  constructor(
    @inject('datasources.mongo_db_autosleo') dataSource: MongoDbAutosleoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ColaboradorRepository') protected colaboradorRepositoryGetter: Getter<ColaboradorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.colaboradors = this.createHasManyRepositoryFactoryFor('colaboradors', colaboradorRepositoryGetter,);
    this.registerInclusionResolver('colaboradors', this.colaboradors.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.sucursals = this.createHasManyRepositoryFactoryFor('sucursals', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursals', this.sucursals.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
