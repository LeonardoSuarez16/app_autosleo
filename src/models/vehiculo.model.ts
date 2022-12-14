import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Sucursal} from './sucursal.model';
import {Servicio} from './servicio.model';
import {Producto} from './producto.model';
import {Plan} from './plan.model';
import {Colaborador} from './colaborador.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  placa?: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  linea: string;

  @property({
    type: 'string',
    required: true,
  })
  cilindraje: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_soat: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_RTM: string;

  @property({
    type: 'number',
    required: true,
  })
  kilometraje_registro: number;

  @property({
    type: 'date',
    required: true,
  })
  visita: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_de_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  observacion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_servicio: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Sucursal)
  sucursals: Sucursal[];

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Colaborador)
  colaboradors: Colaborador[];

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

  @property({
    type: 'string',
  })
  capacitacionId?: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
