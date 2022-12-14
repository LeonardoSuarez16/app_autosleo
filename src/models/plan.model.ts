import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Sucursal} from './sucursal.model';
import {Servicio} from './servicio.model';
import {Proveedor} from './proveedor.model';
import {Prospecto} from './prospecto.model';
import {Producto} from './producto.model';
import {Colaborador} from './colaborador.model';
import {Capacitacion} from './capacitacion.model';

@model()
export class Plan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  nombre_del_plan?: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  duracion: string;

  @property({
    type: 'string',
    required: true,
  })
  beneficios: string;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @hasMany(() => Usuario)
  usuarios: Usuario[];
  @property({
    type: 'string',
  })
  prospectoId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @belongsTo(() => Usuario)
  usuarioId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Sucursal)
  sucursalId: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @hasMany(() => Proveedor)
  proveedors: Proveedor[];

  @hasMany(() => Prospecto)
  prospectos: Prospecto[];

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Colaborador)
  colaboradors: Colaborador[];

  @hasMany(() => Capacitacion)
  capacitacions: Capacitacion[];

  @property({
    type: 'string',
  })
  colaboradorId?: string;

  @property({
    type: 'string',
  })
  capacitacionId?: string;

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
