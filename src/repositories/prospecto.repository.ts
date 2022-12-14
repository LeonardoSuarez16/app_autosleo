import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbAutosleoDataSource} from '../datasources';
import {Prospecto, ProspectoRelations, Usuario, Vehiculo, Servicio, Producto, Plan, Colaborador, Capacitacion} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {ServicioRepository} from './servicio.repository';
import {ProductoRepository} from './producto.repository';
import {PlanRepository} from './plan.repository';
import {ColaboradorRepository} from './colaborador.repository';
import {CapacitacionRepository} from './capacitacion.repository';

export class ProspectoRepository extends DefaultCrudRepository<
  Prospecto,
  typeof Prospecto.prototype.id,
  ProspectoRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Prospecto.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Prospecto.prototype.id>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Prospecto.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Prospecto.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Prospecto.prototype.id>;

  public readonly colaboradors: HasManyRepositoryFactory<Colaborador, typeof Prospecto.prototype.id>;

  public readonly capacitacions: HasManyRepositoryFactory<Capacitacion, typeof Prospecto.prototype.id>;

  constructor(
    @inject('datasources.mongo_db_autosleo') dataSource: MongoDbAutosleoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ColaboradorRepository') protected colaboradorRepositoryGetter: Getter<ColaboradorRepository>, @repository.getter('CapacitacionRepository') protected capacitacionRepositoryGetter: Getter<CapacitacionRepository>,
  ) {
    super(Prospecto, dataSource);
    this.capacitacions = this.createHasManyRepositoryFactoryFor('capacitacions', capacitacionRepositoryGetter,);
    this.registerInclusionResolver('capacitacions', this.capacitacions.inclusionResolver);
    this.colaboradors = this.createHasManyRepositoryFactoryFor('colaboradors', colaboradorRepositoryGetter,);
    this.registerInclusionResolver('colaboradors', this.colaboradors.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
