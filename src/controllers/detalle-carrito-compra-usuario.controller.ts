import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleCarritoCompra,
  Usuario,
} from '../models';
import {DetalleCarritoCompraRepository} from '../repositories';

export class DetalleCarritoCompraUsuarioController {
  constructor(
    @repository(DetalleCarritoCompraRepository)
    public detalleCarritoCompraRepository: DetalleCarritoCompraRepository,
  ) { }

  @get('/detalle-carrito-compras/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to DetalleCarritoCompra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof DetalleCarritoCompra.prototype.id,
  ): Promise<Usuario> {
    return this.detalleCarritoCompraRepository.usuario(id);
  }
}
