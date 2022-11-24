import {Entity, model, property, belongsTo} from '@loopback/repository';
import {OrdenCompra} from './orden-compra.model';

@model()
export class DetalleOrden extends Entity {
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
  ordencompra: string;

  @property({
    type: 'string',
    required: true,
  })
  producto: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => OrdenCompra)
  ordenCompraId: string;

  constructor(data?: Partial<DetalleOrden>) {
    super(data);
  }
}

export interface DetalleOrdenRelations {
  // describe navigational properties here
}

export type DetalleOrdenWithRelations = DetalleOrden & DetalleOrdenRelations;
