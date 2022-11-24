import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleOrden, DetalleOrdenRelations, OrdenCompra} from '../models';
import {OrdenCompraRepository} from './orden-compra.repository';

export class DetalleOrdenRepository extends DefaultCrudRepository<
  DetalleOrden,
  typeof DetalleOrden.prototype.id,
  DetalleOrdenRelations
> {

  public readonly ordenCompra: BelongsToAccessor<OrdenCompra, typeof DetalleOrden.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrdenCompraRepository') protected ordenCompraRepositoryGetter: Getter<OrdenCompraRepository>,
  ) {
    super(DetalleOrden, dataSource);
    this.ordenCompra = this.createBelongsToAccessorFor('ordenCompra', ordenCompraRepositoryGetter,);
    this.registerInclusionResolver('ordenCompra', this.ordenCompra.inclusionResolver);
  }
}
