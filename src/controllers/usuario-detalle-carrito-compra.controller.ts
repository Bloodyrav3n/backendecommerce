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
  Usuario,
  DetalleCarritoCompra,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioDetalleCarritoCompraController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/detalle-carrito-compras', {
    responses: {
      '200': {
        description: 'Array of Usuario has many DetalleCarritoCompra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleCarritoCompra)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleCarritoCompra>,
  ): Promise<DetalleCarritoCompra[]> {
    return this.usuarioRepository.detalleCarritoCompras(id).find(filter);
  }

  @post('/usuarios/{id}/detalle-carrito-compras', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleCarritoCompra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleCarritoCompra, {
            title: 'NewDetalleCarritoCompraInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) detalleCarritoCompra: Omit<DetalleCarritoCompra, 'id'>,
  ): Promise<DetalleCarritoCompra> {
    return this.usuarioRepository.detalleCarritoCompras(id).create(detalleCarritoCompra);
  }

  @patch('/usuarios/{id}/detalle-carrito-compras', {
    responses: {
      '200': {
        description: 'Usuario.DetalleCarritoCompra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleCarritoCompra, {partial: true}),
        },
      },
    })
    detalleCarritoCompra: Partial<DetalleCarritoCompra>,
    @param.query.object('where', getWhereSchemaFor(DetalleCarritoCompra)) where?: Where<DetalleCarritoCompra>,
  ): Promise<Count> {
    return this.usuarioRepository.detalleCarritoCompras(id).patch(detalleCarritoCompra, where);
  }

  @del('/usuarios/{id}/detalle-carrito-compras', {
    responses: {
      '200': {
        description: 'Usuario.DetalleCarritoCompra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleCarritoCompra)) where?: Where<DetalleCarritoCompra>,
  ): Promise<Count> {
    return this.usuarioRepository.detalleCarritoCompras(id).delete(where);
  }
}
