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
  Categoria,
} from '../models';
import {ProductoXCategoriaRepository} from '../repositories';

export class ProductoXCategoriaCategoriaController {
  constructor(
    @repository(ProductoXCategoriaRepository)
    public productoXCategoriaRepository: ProductoXCategoriaRepository,
  ) { }

  @get('/producto-x-categorias/{id}/categoria', {
    responses: {
      '200': {
        description: 'Categoria belonging to ProductoXCategoria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async getCategoria(
    @param.path.string('id') id: typeof ProductoXCategoria.prototype.id,
  ): Promise<Categoria> {
    return this.productoXCategoriaRepository.categoria(id);
  }
}
