import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductoXCategoria,
  Producto,
} from '../models';
import {ProductoXCategoriaRepository} from '../repositories';

export class ProductoXCategoriaProductoController {
  constructor(
    @repository(ProductoXCategoriaRepository)
    public productoXCategoriaRepository: ProductoXCategoriaRepository,
  ) { }

  @get('/producto-x-categorias/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to ProductoXCategoria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof ProductoXCategoria.prototype.id,
  ): Promise<Producto> {
    return this.productoXCategoriaRepository.producto(id);
  }
}
