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
import {DetalleCarritoCompra} from '../models';
import {DetalleCarritoCompraRepository} from '../repositories';

export class DetalleCarritoCompraController {
  constructor(
    @repository(DetalleCarritoCompraRepository)
    public detalleCarritoCompraRepository : DetalleCarritoCompraRepository,
  ) {}

  @post('/detallecarritocompras')
  @response(200, {
    description: 'DetalleCarritoCompra model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetalleCarritoCompra)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleCarritoCompra, {
            title: 'NewDetalleCarritoCompra',
            exclude: ['id'],
          }),
        },
      },
    })
    detalleCarritoCompra: Omit<DetalleCarritoCompra, 'id'>,
  ): Promise<DetalleCarritoCompra> {
    return this.detalleCarritoCompraRepository.create(detalleCarritoCompra);
  }

  @get('/detallecarritocompras/count')
  @response(200, {
    description: 'DetalleCarritoCompra model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetalleCarritoCompra) where?: Where<DetalleCarritoCompra>,
  ): Promise<Count> {
    return this.detalleCarritoCompraRepository.count(where);
  }

  @get('/detallecarritocompras')
  @response(200, {
    description: 'Array of DetalleCarritoCompra model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetalleCarritoCompra, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetalleCarritoCompra) filter?: Filter<DetalleCarritoCompra>,
  ): Promise<DetalleCarritoCompra[]> {
    return this.detalleCarritoCompraRepository.find(filter);
  }

  @patch('/detallecarritocompras')
  @response(200, {
    description: 'DetalleCarritoCompra PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleCarritoCompra, {partial: true}),
        },
      },
    })
    detalleCarritoCompra: DetalleCarritoCompra,
    @param.where(DetalleCarritoCompra) where?: Where<DetalleCarritoCompra>,
  ): Promise<Count> {
    return this.detalleCarritoCompraRepository.updateAll(detalleCarritoCompra, where);
  }

  @get('/detallecarritocompras/{id}')
  @response(200, {
    description: 'DetalleCarritoCompra model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetalleCarritoCompra, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetalleCarritoCompra, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleCarritoCompra>
  ): Promise<DetalleCarritoCompra> {
    return this.detalleCarritoCompraRepository.findById(id, filter);
  }

  @patch('/detallecarritocompras/{id}')
  @response(204, {
    description: 'DetalleCarritoCompra PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleCarritoCompra, {partial: true}),
        },
      },
    })
    detalleCarritoCompra: DetalleCarritoCompra,
  ): Promise<void> {
    await this.detalleCarritoCompraRepository.updateById(id, detalleCarritoCompra);
  }

  @put('/detallecarritocompras/{id}')
  @response(204, {
    description: 'DetalleCarritoCompra PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detalleCarritoCompra: DetalleCarritoCompra,
  ): Promise<void> {
    await this.detalleCarritoCompraRepository.replaceById(id, detalleCarritoCompra);
  }

  @del('/detallecarritocompras/{id}')
  @response(204, {
    description: 'DetalleCarritoCompra DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detalleCarritoCompraRepository.deleteById(id);
  }
}
