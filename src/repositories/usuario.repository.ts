import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbAutosleoDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Plan, Vehiculo, Producto, Capacitacion, Prospecto, Servicio, Sucursal} from '../models';
import {PlanRepository} from './plan.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {ProductoRepository} from './producto.repository';
import {CapacitacionRepository} from './capacitacion.repository';
import {ProspectoRepository} from './prospecto.repository';
import {ServicioRepository} from './servicio.repository';
import {SucursalRepository} from './sucursal.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.documento,
  UsuarioRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof Usuario.prototype.documento>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Usuario.prototype.documento>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Usuario.prototype.documento>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Usuario.prototype.documento>;

  public readonly capacitacions: HasManyRepositoryFactory<Capacitacion, typeof Usuario.prototype.documento>;

  public readonly prospecto: HasOneRepositoryFactory<Prospecto, typeof Usuario.prototype.documento>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Usuario.prototype.documento>;

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Usuario.prototype.documento>;

  constructor(
    @inject('datasources.mongo_db_autosleo') dataSource: MongoDbAutosleoDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('CapacitacionRepository') protected capacitacionRepositoryGetter: Getter<CapacitacionRepository>, @repository.getter('ProspectoRepository') protected prospectoRepositoryGetter: Getter<ProspectoRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Usuario, dataSource);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.prospecto = this.createHasOneRepositoryFactoryFor('prospecto', prospectoRepositoryGetter);
    this.registerInclusionResolver('prospecto', this.prospecto.inclusionResolver);
    this.capacitacions = this.createHasManyRepositoryFactoryFor('capacitacions', capacitacionRepositoryGetter,);
    this.registerInclusionResolver('capacitacions', this.capacitacions.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
