import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Plan} from './plan.model';
import {Vehiculo} from './vehiculo.model';
import {Producto} from './producto.model';
import {Capacitacion} from './capacitacion.model';
import {Prospecto} from './prospecto.model';
import {Servicio} from './servicio.model';
import {Sucursal} from './sucursal.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  documento?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_documento: string;

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
    type: 'date',
    required: true,
  })
  fecha_de_nacimiento: Date;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  municipio: string;

  @property({
    type: 'string',
    required: true,
  })
  ocupacion: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_de_cliente: string;

  @belongsTo(() => Plan)
  planId: string;

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Capacitacion)
  capacitacions: Capacitacion[];

  @hasOne(() => Prospecto)
  prospecto: Prospecto;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  @belongsTo(() => Sucursal)
  sucursalId: string;

  @property({
    type: 'string',
  })
  prospectoId?: string;

  @property({
    type: 'string',
  })
  colaboradorId?: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
