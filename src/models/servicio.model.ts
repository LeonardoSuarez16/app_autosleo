import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Producto} from './producto.model';
import {Colaborador} from './colaborador.model';

@model()
export class Servicio extends Entity {
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
  tecnico: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_servicio: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  tiempo_estimado: string;

  @property({
    type: 'string',
    required: true,
  })
  observacion: string;

  @property({
    type: 'string',
    required: true,
  })
  disponibilidad: string;
  @property({
    type: 'string',
  })
  sucursalId?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Colaborador)
  colaboradors: Colaborador[];

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

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
