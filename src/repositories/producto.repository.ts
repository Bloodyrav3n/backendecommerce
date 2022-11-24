import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, ProductoXCategoria} from '../models';
import {ProductoXCategoriaRepository} from './producto-x-categoria.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly productoXCategorias: HasManyRepositoryFactory<ProductoXCategoria, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoXCategoriaRepository') protected productoXCategoriaRepositoryGetter: Getter<ProductoXCategoriaRepository>,
  ) {
    super(Producto, dataSource);
    this.productoXCategorias = this.createHasManyRepositoryFactoryFor('productoXCategorias', productoXCategoriaRepositoryGetter,);
    this.registerInclusionResolver('productoXCategorias', this.productoXCategorias.inclusionResolver);
  }
}
