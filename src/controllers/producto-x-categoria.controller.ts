import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductoXCategoria} from '../models';
import {ProductoXCategoriaRepository} from '../repositories';

export class ProductoXCategoriaController {
  constructor(
    @repository(ProductoXCategoriaRepository)
    public productoXCategoriaRepository : ProductoXCategoriaRepository,
  ) {}

  @post('/productoscategorias')
  @response(200, {
    description: 'ProductoXCategoria model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoXCategoria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoXCategoria, {
            title: 'NewProductoXCategoria',
            exclude: ['id'],
          }),
        },
      },
    })
    productoXCategoria: Omit<ProductoXCategoria, 'id'>,
  ): Promise<ProductoXCategoria> {
    return this.productoXCategoriaRepository.create(productoXCategoria);
  }

  @get('/productoscategorias/count')
  @response(200, {
    description: 'ProductoXCategoria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoXCategoria) where?: Where<ProductoXCategoria>,
  ): Promise<Count> {
    return this.productoXCategoriaRepository.count(where);
  }

  @get('/productoscategorias')
  @response(200, {
    description: 'Array of ProductoXCategoria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoXCategoria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoXCategoria) filter?: Filter<ProductoXCategoria>,
  ): Promise<ProductoXCategoria[]> {
    return this.productoXCategoriaRepository.find(filter);
  }

  @patch('/productoscategorias')
  @response(200, {
    description: 'ProductoXCategoria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoXCategoria, {partial: true}),
        },
      },
    })
    productoXCategoria: ProductoXCategoria,
    @param.where(ProductoXCategoria) where?: Where<ProductoXCategoria>,
  ): Promise<Count> {
    return this.productoXCategoriaRepository.updateAll(productoXCategoria, where);
  }

  @get('/productoscategorias/{id}')
  @response(200, {
    description: 'ProductoXCategoria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoXCategoria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductoXCategoria, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoXCategoria>
  ): Promise<ProductoXCategoria> {
    return this.productoXCategoriaRepository.findById(id, filter);
  }

  @patch('/productoscategorias/{id}')
  @response(204, {
    description: 'ProductoXCategoria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoXCategoria, {partial: true}),
        },
      },
    })
    productoXCategoria: ProductoXCategoria,
  ): Promise<void> {
    await this.productoXCategoriaRepository.updateById(id, productoXCategoria);
  }

  @put('/productoscategorias/{id}')
  @response(204, {
    description: 'ProductoXCategoria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productoXCategoria: ProductoXCategoria,
  ): Promise<void> {
    await this.productoXCategoriaRepository.replaceById(id, productoXCategoria);
  }

  @del('/productoscategorias/{id}')
  @response(204, {
    description: 'ProductoXCategoria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productoXCategoriaRepository.deleteById(id);
  }
}
