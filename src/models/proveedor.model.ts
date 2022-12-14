import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {Sucursal} from './sucursal.model';
import {Colaborador} from './colaborador.model';

@model()
export class Proveedor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  nit?: string;

  @property({
    type: 'string',
    required: true,
  })
  razon_social: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_contacto: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'number',
    required: true,
  })
  dias_de_credito: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo_de_regimen: string;

  @property({
    type: 'number',
    required: true,
  })
  rete_ica: number;

  @property({
    type: 'number',
    required: true,
  })
  rete_fuente: number;

  @property({
    type: 'number',
    required: true,
  })
  rete_iva: number;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_de_persona: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_de_identificacion: string;

  @property({
    type: 'string',
  })
  sucursalId?: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Sucursal)
  sucursals: Sucursal[];

  @hasMany(() => Colaborador)
  colaboradors: Colaborador[];

  @property({
    type: 'string',
  })
  productoId?: string;

  @property({
    type: 'string',
  })
  planId?: string;

  @property({
    type: 'string',
  })
  colaboradorId?: string;

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
