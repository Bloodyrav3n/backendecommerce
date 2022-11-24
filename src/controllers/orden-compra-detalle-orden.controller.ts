import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  OrdenCompra,
  DetalleOrden,
} from '../models';
import {OrdenCompraRepository} from '../repositories';

export class OrdenCompraDetalleOrdenController {
  constructor(
    @repository(OrdenCompraRepository) protected ordenCompraRepository: OrdenCompraRepository,
  ) { }

  @get('/orden-compras/{id}/detalle-ordens', {
    responses: {
      '200': {
        description: 'Array of OrdenCompra has many DetalleOrden',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleOrden)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleOrden>,
  ): Promise<DetalleOrden[]> {
    return this.ordenCompraRepository.detalleOrdens(id).find(filter);
  }

  @post('/orden-compras/{id}/detalle-ordens', {
    responses: {
      '200': {
        description: 'OrdenCompra model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleOrden)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof OrdenCompra.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleOrden, {
            title: 'NewDetalleOrdenInOrdenCompra',
            exclude: ['id'],
            optional: ['ordenCompraId']
          }),
        },
      },
    }) detalleOrden: Omit<DetalleOrden, 'id'>,
  ): Promise<DetalleOrden> {
    return this.ordenCompraRepository.detalleOrdens(id).create(detalleOrden);
  }

  @patch('/orden-compras/{id}/detalle-ordens', {
    responses: {
      '200': {
        description: 'OrdenCompra.DetalleOrden PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleOrden, {partial: true}),
        },
      },
    })
    detalleOrden: Partial<DetalleOrden>,
    @param.query.object('where', getWhereSchemaFor(DetalleOrden)) where?: Where<DetalleOrden>,
  ): Promise<Count> {
    return this.ordenCompraRepository.detalleOrdens(id).patch(detalleOrden, where);
  }

  @del('/orden-compras/{id}/detalle-ordens', {
    responses: {
      '200': {
        description: 'OrdenCompra.DetalleOrden DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleOrden)) where?: Where<DetalleOrden>,
  ): Promise<Count> {
    return this.ordenCompraRepository.detalleOrdens(id).delete(where);
  }
}
