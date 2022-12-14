import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Servicio} from './servicio.model';
import {Proveedor} from './proveedor.model';
import {Prospecto} from './prospecto.model';
import {Producto} from './producto.model';
import {Plan} from './plan.model';
import {Colaborador} from './colaborador.model';
import {Capacitacion} from './capacitacion.model';

@model()
export class Sucursal extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  nombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  municipio: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @hasMany(() => Proveedor)
  proveedors: Proveedor[];

  @hasMany(() => Prospecto)
  prospectos: Prospecto[];

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Colaborador)
  colaboradors: Colaborador[];

  @hasMany(() => Capacitacion)
  capacitacions: Capacitacion[];

  @property({
    type: 'string',
  })
  proveedorId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  @property({
    type: 'string',
  })
  capacitacionId?: string;

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
