import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Sucursal} from './sucursal.model';
import {Servicio} from './servicio.model';
import {Proveedor} from './proveedor.model';
import {Prospecto} from './prospecto.model';
import {Plan} from './plan.model';
import {Capacitacion} from './capacitacion.model';

@model()
export class Colaborador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  cargo?: string;

  @property({
    type: 'string',
    required: true,
  })
  horario: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo: number;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  genero_que_se_identifica: string;

  @property({
    type: 'string',
    required: true,
  })
  profecion: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;
  @property({
    type: 'string',
  })
  servicioId?: string;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  @property({
    type: 'string',
  })
  prospectoId?: string;

  @property({
    type: 'string',
  })
  planId?: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @belongsTo(() => Sucursal)
  sucursalId: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @hasMany(() => Proveedor)
  proveedors: Proveedor[];

  @hasMany(() => Prospecto)
  prospectos: Prospecto[];

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Capacitacion)
  capacitacions: Capacitacion[];

  @property({
    type: 'string',
  })
  capacitacionId?: string;

  constructor(data?: Partial<Colaborador>) {
    super(data);
  }
}

export interface ColaboradorRelations {
  // describe navigational properties here
}

export type ColaboradorWithRelations = Colaborador & ColaboradorRelations;
