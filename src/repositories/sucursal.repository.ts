import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbAutosleoDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Usuario, Vehiculo, Servicio, Proveedor, Prospecto, Producto, Plan, Colaborador, Capacitacion} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {ServicioRepository} from './servicio.repository';
import {ProveedorRepository} from './proveedor.repository';
import {ProspectoRepository} from './prospecto.repository';
import {ProductoRepository} from './producto.repository';
import {PlanRepository} from './plan.repository';
import {ColaboradorRepository} from './colaborador.repository';
import {CapacitacionRepository} from './capacitacion.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.nombre,
  SucursalRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Sucursal.prototype.nombre>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Sucursal.prototype.nombre>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Sucursal.prototype.nombre>;

  public readonly proveedors: HasManyRepositoryFactory<Proveedor, typeof Sucursal.prototype.nombre>;

  public readonly prospectos: HasManyRepositoryFactory<Prospecto, typeof Sucursal.prototype.nombre>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Sucursal.prototype.nombre>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Sucursal.prototype.nombre>;

  public readonly colaboradors: HasManyRepositoryFactory<Colaborador, typeof Sucursal.prototype.nombre>;

  public readonly capacitacions: HasManyRepositoryFactory<Capacitacion, typeof Sucursal.prototype.nombre>;

  constructor(
    @inject('datasources.mongo_db_autosleo') dataSource: MongoDbAutosleoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('ProspectoRepository') protected prospectoRepositoryGetter: Getter<ProspectoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ColaboradorRepository') protected colaboradorRepositoryGetter: Getter<ColaboradorRepository>, @repository.getter('CapacitacionRepository') protected capacitacionRepositoryGetter: Getter<CapacitacionRepository>,
  ) {
    super(Sucursal, dataSource);
    this.capacitacions = this.createHasManyRepositoryFactoryFor('capacitacions', capacitacionRepositoryGetter,);
    this.registerInclusionResolver('capacitacions', this.capacitacions.inclusionResolver);
    this.colaboradors = this.createHasManyRepositoryFactoryFor('colaboradors', colaboradorRepositoryGetter,);
    this.registerInclusionResolver('colaboradors', this.colaboradors.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.prospectos = this.createHasManyRepositoryFactoryFor('prospectos', prospectoRepositoryGetter,);
    this.registerInclusionResolver('prospectos', this.prospectos.inclusionResolver);
    this.proveedors = this.createHasManyRepositoryFactoryFor('proveedors', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
