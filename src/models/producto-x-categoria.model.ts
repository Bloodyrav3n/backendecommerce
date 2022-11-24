import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {Producto} from './producto.model';

@model()
export class ProductoXCategoria extends Entity {
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
    type: 'string',
    required: true,
  })
  categoria: string;

  @belongsTo(() => Categoria)
  categoriaId: string;

  @belongsTo(() => Producto)
  productoId: string;

  constructor(data?: Partial<ProductoXCategoria>) {
    super(data);
  }
}

export interface ProductoXCategoriaRelations {
  // describe navigational properties here
}

export type ProductoXCategoriaWithRelations = ProductoXCategoria & ProductoXCategoriaRelations;
