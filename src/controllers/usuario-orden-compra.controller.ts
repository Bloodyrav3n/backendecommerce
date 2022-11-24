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
  OrdenCompra,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioOrdenCompraController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/orden-compras', {
    responses: {
      '200': {
        description: 'Array of Usuario has many OrdenCompra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrdenCompra)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrdenCompra>,
  ): Promise<OrdenCompra[]> {
    return this.usuarioRepository.ordenCompras(id).find(filter);
  }

  @post('/usuarios/{id}/orden-compras', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrdenCompra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenCompra, {
            title: 'NewOrdenCompraInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) ordenCompra: Omit<OrdenCompra, 'id'>,
  ): Promise<OrdenCompra> {
    return this.usuarioRepository.ordenCompras(id).create(ordenCompra);
  }

  @patch('/usuarios/{id}/orden-compras', {
    responses: {
      '200': {
        description: 'Usuario.OrdenCompra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenCompra, {partial: true}),
        },
      },
    })
    ordenCompra: Partial<OrdenCompra>,
    @param.query.object('where', getWhereSchemaFor(OrdenCompra)) where?: Where<OrdenCompra>,
  ): Promise<Count> {
    return this.usuarioRepository.ordenCompras(id).patch(ordenCompra, where);
  }

  @del('/usuarios/{id}/orden-compras', {
    responses: {
      '200': {
        description: 'Usuario.OrdenCompra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrdenCompra)) where?: Where<OrdenCompra>,
  ): Promise<Count> {
    return this.usuarioRepository.ordenCompras(id).delete(where);
  }
}
