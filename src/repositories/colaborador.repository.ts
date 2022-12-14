import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbAutosleoDataSource} from '../datasources';
import {Colaborador, ColaboradorRelations, Usuario, Vehiculo, Sucursal, Servicio, Proveedor, Prospecto, Plan, Capacitacion} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {SucursalRepository} from './sucursal.repository';
import {ServicioRepository} from './servicio.repository';
import {ProveedorRepository} from './proveedor.repository';
import {ProspectoRepository} from './prospecto.repository';
import {PlanRepository} from './plan.repository';
import {CapacitacionRepository} from './capacitacion.repository';

export class ColaboradorRepository extends DefaultCrudRepository<
  Colaborador,
  typeof Colaborador.prototype.cargo,
  ColaboradorRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Colaborador.prototype.cargo>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Colaborador.prototype.cargo>;

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Colaborador.prototype.cargo>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Colaborador.prototype.cargo>;

  public readonly proveedors: HasManyRepositoryFactory<Proveedor, typeof Colaborador.prototype.cargo>;

  public readonly prospectos: HasManyRepositoryFactory<Prospecto, typeof Colaborador.prototype.cargo>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Colaborador.prototype.cargo>;

  public readonly capacitacions: HasManyRepositoryFactory<Capacitacion, typeof Colaborador.prototype.cargo>;

  constructor(
    @inject('datasources.mongo_db_autosleo') dataSource: MongoDbAutosleoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('ProspectoRepository') protected prospectoRepositoryGetter: Getter<ProspectoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('CapacitacionRepository') protected capacitacionRepositoryGetter: Getter<CapacitacionRepository>,
  ) {
    super(Colaborador, dataSource);
    this.capacitacions = this.createHasManyRepositoryFactoryFor('capacitacions', capacitacionRepositoryGetter,);
    this.registerInclusionResolver('capacitacions', this.capacitacions.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.prospectos = this.createHasManyRepositoryFactoryFor('prospectos', prospectoRepositoryGetter,);
    this.registerInclusionResolver('prospectos', this.prospectos.inclusionResolver);
    this.proveedors = this.createHasManyRepositoryFactoryFor('proveedors', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
