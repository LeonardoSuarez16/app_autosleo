import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';
import {Sucursal} from './sucursal.model';
import {Proveedor} from './proveedor.model';
import {Plan} from './plan.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  codigo?: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  atributo: string;

  @property({
    type: 'number',
    required: true,
  })
  precio_1: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_2: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_3: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_4: number;

  @property({
    type: 'number',
    required: true,
  })
  iva: number;

  @property({
    type: 'number',
    required: true,
  })
  utilidad: number;

  @property({
    type: 'string',
    required: true,
  })
  estateria: string;

  @property({
    type: 'string',
    required: true,
  })
  pasillo: string;

  @property({
    type: 'string',
    required: true,
  })
  proveedor: string;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'string',
    required: true,
  })
  consecutivo: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_de_barras: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  asesor_designado: string;
  @property({
    type: 'string',
  })
  sucursalId?: string;

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

  @belongsTo(() => Usuario)
  usuarioId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @hasMany(() => Sucursal)
  sucursals: Sucursal[];

  @hasMany(() => Proveedor)
  proveedors: Proveedor[];

  @hasMany(() => Plan)
  plans: Plan[];

  @property({
    type: 'string',
  })
  planId?: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
