import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleCarritoCompra, DetalleCarritoCompraRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class DetalleCarritoCompraRepository extends DefaultCrudRepository<
  DetalleCarritoCompra,
  typeof DetalleCarritoCompra.prototype.id,
  DetalleCarritoCompraRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof DetalleCarritoCompra.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(DetalleCarritoCompra, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
