import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbAutosleoDataSource} from '../datasources';
import {Plan, PlanRelations, Usuario, Vehiculo, Sucursal, Servicio, Proveedor, Prospecto, Producto, Colaborador, Capacitacion} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {SucursalRepository} from './sucursal.repository';
import {ServicioRepository} from './servicio.repository';
import {ProveedorRepository} from './proveedor.repository';
import {ProspectoRepository} from './prospecto.repository';
import {ProductoRepository} from './producto.repository';
import {ColaboradorRepository} from './colaborador.repository';
import {CapacitacionRepository} from './capacitacion.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.nombre_del_plan,
  PlanRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Plan.prototype.nombre_del_plan>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Plan.prototype.nombre_del_plan>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Plan.prototype.nombre_del_plan>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Plan.prototype.nombre_del_plan>;

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Plan.prototype.nombre_del_plan>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Plan.prototype.nombre_del_plan>;

  public readonly proveedors: HasManyRepositoryFactory<Proveedor, typeof Plan.prototype.nombre_del_plan>;

  public readonly prospectos: HasManyRepositoryFactory<Prospecto, typeof Plan.prototype.nombre_del_plan>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Plan.prototype.nombre_del_plan>;

  public readonly colaboradors: HasManyRepositoryFactory<Colaborador, typeof Plan.prototype.nombre_del_plan>;

  public readonly capacitacions: HasManyRepositoryFactory<Capacitacion, typeof Plan.prototype.nombre_del_plan>;

  constructor(
    @inject('datasources.mongo_db_autosleo') dataSource: MongoDbAutosleoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('ProspectoRepository') protected prospectoRepositoryGetter: Getter<ProspectoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ColaboradorRepository') protected colaboradorRepositoryGetter: Getter<ColaboradorRepository>, @repository.getter('CapacitacionRepository') protected capacitacionRepositoryGetter: Getter<CapacitacionRepository>,
  ) {
    super(Plan, dataSource);
    this.capacitacions = this.createHasManyRepositoryFactoryFor('capacitacions', capacitacionRepositoryGetter,);
    this.registerInclusionResolver('capacitacions', this.capacitacions.inclusionResolver);
    this.colaboradors = this.createHasManyRepositoryFactoryFor('colaboradors', colaboradorRepositoryGetter,);
    this.registerInclusionResolver('colaboradors', this.colaboradors.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.prospectos = this.createHasManyRepositoryFactoryFor('prospectos', prospectoRepositoryGetter,);
    this.registerInclusionResolver('prospectos', this.prospectos.inclusionResolver);
    this.proveedors = this.createHasManyRepositoryFactoryFor('proveedors', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
