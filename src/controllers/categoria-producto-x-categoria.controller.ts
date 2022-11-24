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
  Categoria,
  ProductoXCategoria,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaProductoXCategoriaController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Array of Categoria has many ProductoXCategoria',
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
    return this.categoriaRepository.productoXCategorias(id).find(filter);
  }

  @post('/categorias/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoXCategoria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoXCategoria, {
            title: 'NewProductoXCategoriaInCategoria',
            exclude: ['id'],
            optional: ['categoriaId']
          }),
        },
      },
    }) productoXCategoria: Omit<ProductoXCategoria, 'id'>,
  ): Promise<ProductoXCategoria> {
    return this.categoriaRepository.productoXCategorias(id).create(productoXCategoria);
  }

  @patch('/categorias/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Categoria.ProductoXCategoria PATCH success count',
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
    return this.categoriaRepository.productoXCategorias(id).patch(productoXCategoria, where);
  }

  @del('/categorias/{id}/producto-x-categorias', {
    responses: {
      '200': {
        description: 'Categoria.ProductoXCategoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductoXCategoria)) where?: Where<ProductoXCategoria>,
  ): Promise<Count> {
    return this.categoriaRepository.productoXCategorias(id).delete(where);
  }
}
