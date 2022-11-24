import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {DetalleOrden} from './detalle-orden.model';

@model()
export class OrdenCompra extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion_envio: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => DetalleOrden)
  detalleOrdens: DetalleOrden[];

  constructor(data?: Partial<OrdenCompra>) {
    super(data);
  }
}

export interface OrdenCompraRelations {
  // describe navigational properties here
}

export type OrdenCompraWithRelations = OrdenCompra & OrdenCompraRelations;
