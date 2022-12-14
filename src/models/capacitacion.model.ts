import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Sucursal} from './sucursal.model';
import {Prospecto} from './prospecto.model';
import {Plan} from './plan.model';
import {Colaborador} from './colaborador.model';

@model()
export class Capacitacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  nombre?: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_de_certificacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio: string;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;
  @property({
    type: 'string',
  })
  sucursalId?: string;

  @property({
    type: 'string',
  })
  prospectoId?: string;

  @property({
    type: 'string',
  })
  planId?: string;

  @property({
    type: 'string',
  })
  colaboradorId?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasMany(() => Sucursal)
  sucursals: Sucursal[];

  @hasMany(() => Prospecto)
  prospectos: Prospecto[];

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Colaborador)
  colaboradors: Colaborador[];

  constructor(data?: Partial<Capacitacion>) {
    super(data);
  }
}

export interface CapacitacionRelations {
  // describe navigational properties here
}

export type CapacitacionWithRelations = Capacitacion & CapacitacionRelations;
