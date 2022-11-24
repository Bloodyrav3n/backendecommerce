import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleOrden,
  OrdenCompra,
} from '../models';
import {DetalleOrdenRepository} from '../repositories';

export class DetalleOrdenOrdenCompraController {
  constructor(
    @repository(DetalleOrdenRepository)
    public detalleOrdenRepository: DetalleOrdenRepository,
  ) { }

  @get('/detalle-ordens/{id}/orden-compra', {
    responses: {
      '200': {
        description: 'OrdenCompra belonging to DetalleOrden',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrdenCompra)},
          },
        },
      },
    },
  })
  async getOrdenCompra(
    @param.path.string('id') id: typeof DetalleOrden.prototype.id,
  ): Promise<OrdenCompra> {
    return this.detalleOrdenRepository.ordenCompra(id);
  }
}
