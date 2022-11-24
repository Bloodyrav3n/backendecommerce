import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Categoria, CategoriaRelations, ProductoXCategoria} from '../models';
import {ProductoXCategoriaRepository} from './producto-x-categoria.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly productoXCategorias: HasManyRepositoryFactory<ProductoXCategoria, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoXCategoriaRepository') protected productoXCategoriaRepositoryGetter: Getter<ProductoXCategoriaRepository>,
  ) {
    super(Categoria, dataSource);
    this.productoXCategorias = this.createHasManyRepositoryFactoryFor('productoXCategorias', productoXCategoriaRepositoryGetter,);
    this.registerInclusionResolver('productoXCategorias', this.productoXCategorias.inclusionResolver);
  }
}
