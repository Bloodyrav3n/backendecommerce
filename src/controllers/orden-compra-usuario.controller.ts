import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrdenCompra,
  Usuario,
} from '../models';
import {OrdenCompraRepository} from '../repositories';

export class OrdenCompraUsuarioController {
  constructor(
    @repository(OrdenCompraRepository)
    public ordenCompraRepository: OrdenCompraRepository,
  ) { }

  @get('/orden-compras/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to OrdenCompra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof OrdenCompra.prototype.id,
  ): Promise<Usuario> {
    return this.ordenCompraRepository.usuario(id);
  }
}
