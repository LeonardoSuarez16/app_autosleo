import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbAutosleoDataSource} from '../datasources';
import {Capacitacion, CapacitacionRelations, Usuario, Vehiculo, Sucursal, Prospecto, Plan, Colaborador} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {SucursalRepository} from './sucursal.repository';
import {ProspectoRepository} from './prospecto.repository';
import {PlanRepository} from './plan.repository';
import {ColaboradorRepository} from './colaborador.repository';

export class CapacitacionRepository extends DefaultCrudRepository<
  Capacitacion,
  typeof Capacitacion.prototype.nombre,
  CapacitacionRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Capacitacion.prototype.nombre>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Capacitacion.prototype.nombre>;

  public readonly sucursals: HasManyRepositoryFactory<Sucursal, typeof Capacitacion.prototype.nombre>;

  public readonly prospectos: HasManyRepositoryFactory<Prospecto, typeof Capacitacion.prototype.nombre>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Capacitacion.prototype.nombre>;

  public readonly colaboradors: HasManyRepositoryFactory<Colaborador, typeof Capacitacion.prototype.nombre>;

  constructor(
    @inject('datasources.mongo_db_autosleo') dataSource: MongoDbAutosleoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('ProspectoRepository') protected prospectoRepositoryGetter: Getter<ProspectoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ColaboradorRepository') protected colaboradorRepositoryGetter: Getter<ColaboradorRepository>,
  ) {
    super(Capacitacion, dataSource);
    this.colaboradors = this.createHasManyRepositoryFactoryFor('colaboradors', colaboradorRepositoryGetter,);
    this.registerInclusionResolver('colaboradors', this.colaboradors.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.prospectos = this.createHasManyRepositoryFactoryFor('prospectos', prospectoRepositoryGetter,);
    this.registerInclusionResolver('prospectos', this.prospectos.inclusionResolver);
    this.sucursals = this.createHasManyRepositoryFactoryFor('sucursals', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursals', this.sucursals.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
