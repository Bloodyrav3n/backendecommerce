import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class DetalleCarritoCompra extends Entity {
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
  producto: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<DetalleCarritoCompra>) {
    super(data);
  }
}

export interface DetalleCarritoCompraRelations {
  // describe navigational properties here
}

export type DetalleCarritoCompraWithRelations = DetalleCarritoCompra & DetalleCarritoCompraRelations;
