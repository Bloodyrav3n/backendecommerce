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
  Producto,
  ProductoXCategoria,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProductoXCategoriaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Array of Producto has many ProductoXCategoria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoXCategoria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductoXCategoria>,
  ): Promise<ProductoXCategoria[]> {
    return this.productoRepository.productoXCategorias(id).find(filter);
  }

  @post('/productos/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoXCategoria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoXCategoria, {
            title: 'NewProductoXCategoriaInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) productoXCategoria: Omit<ProductoXCategoria, 'id'>,
  ): Promise<ProductoXCategoria> {
    return this.productoRepository.productoXCategorias(id).create(productoXCategoria);
  }

  @patch('/productos/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Producto.ProductoXCategoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoXCategoria, {partial: true}),
        },
      },
    })
    productoXCategoria: Partial<ProductoXCategoria>,
    @param.query.object('where', getWhereSchemaFor(ProductoXCategoria)) where?: Where<ProductoXCategoria>,
  ): Promise<Count> {
    return this.productoRepository.productoXCategorias(id).patch(productoXCategoria, where);
  }

  @del('/productos/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Producto.ProductoXCategoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductoXCategoria)) where?: Where<ProductoXCategoria>,
  ): Promise<Count> {
    return this.productoRepository.productoXCategorias(id).delete(where);
  }
}
