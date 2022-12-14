import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Servicio} from './servicio.model';
import {Producto} from './producto.model';
import {Plan} from './plan.model';
import {Colaborador} from './colaborador.model';
import {Capacitacion} from './capacitacion.model';

@model()
export class Prospecto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
  comentario: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @property({
    type: 'string',
  })
  sucursalId?: string;

  @hasOne(() => Usuario)
  usuario: Usuario;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasMany(() => Servicio)
  servicios: Servicio[];

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
  planId?: string;

  @property({
    type: 'string',
  })
  colaboradorId?: string;

  @property({
    type: 'string',
  })
  capacitacionId?: string;

  constructor(data?: Partial<Prospecto>) {
    super(data);
  }
}

export interface ProspectoRelations {
  // describe navigational properties here
}

export type ProspectoWithRelations = Prospecto & ProspectoRelations;
