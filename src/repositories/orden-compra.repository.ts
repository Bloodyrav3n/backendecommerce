import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {OrdenCompra, OrdenCompraRelations, Usuario, DetalleOrden} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {DetalleOrdenRepository} from './detalle-orden.repository';

export class OrdenCompraRepository extends DefaultCrudRepository<
  OrdenCompra,
  typeof OrdenCompra.prototype.id,
  OrdenCompraRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof OrdenCompra.prototype.id>;

  public readonly detalleOrdens: HasManyRepositoryFactory<DetalleOrden, typeof OrdenCompra.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('DetalleOrdenRepository') protected detalleOrdenRepositoryGetter: Getter<DetalleOrdenRepository>,
  ) {
    super(OrdenCompra, dataSource);
    this.detalleOrdens = this.createHasManyRepositoryFactoryFor('detalleOrdens', detalleOrdenRepositoryGetter,);
    this.registerInclusionResolver('detalleOrdens', this.detalleOrdens.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
