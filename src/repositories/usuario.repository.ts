import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, DetalleCarritoCompra, OrdenCompra} from '../models';
import {DetalleCarritoCompraRepository} from './detalle-carrito-compra.repository';
import {OrdenCompraRepository} from './orden-compra.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly detalleCarritoCompras: HasManyRepositoryFactory<DetalleCarritoCompra, typeof Usuario.prototype.id>;

  public readonly ordenCompras: HasManyRepositoryFactory<OrdenCompra, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetalleCarritoCompraRepository') protected detalleCarritoCompraRepositoryGetter: Getter<DetalleCarritoCompraRepository>, @repository.getter('OrdenCompraRepository') protected ordenCompraRepositoryGetter: Getter<OrdenCompraRepository>,
  ) {
    super(Usuario, dataSource);
    this.ordenCompras = this.createHasManyRepositoryFactoryFor('ordenCompras', ordenCompraRepositoryGetter,);
    this.registerInclusionResolver('ordenCompras', this.ordenCompras.inclusionResolver);
    this.detalleCarritoCompras = this.createHasManyRepositoryFactoryFor('detalleCarritoCompras', detalleCarritoCompraRepositoryGetter,);
    this.registerInclusionResolver('detalleCarritoCompras', this.detalleCarritoCompras.inclusionResolver);
  }
}
