import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoXCategoria, ProductoXCategoriaRelations, Categoria, Producto} from '../models';
import {CategoriaRepository} from './categoria.repository';
import {ProductoRepository} from './producto.repository';

export class ProductoXCategoriaRepository extends DefaultCrudRepository<
  ProductoXCategoria,
  typeof ProductoXCategoria.prototype.id,
  ProductoXCategoriaRelations
> {

  public readonly categoria: BelongsToAccessor<Categoria, typeof ProductoXCategoria.prototype.id>;

  public readonly producto: BelongsToAccessor<Producto, typeof ProductoXCategoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(ProductoXCategoria, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
  }
}
