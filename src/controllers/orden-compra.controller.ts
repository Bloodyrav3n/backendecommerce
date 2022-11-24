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
import {OrdenCompra} from '../models';
import {OrdenCompraRepository} from '../repositories';

export class OrdenCompraController {
  constructor(
    @repository(OrdenCompraRepository)
    public ordenCompraRepository : OrdenCompraRepository,
  ) {}

  @post('/ordencompras')
  @response(200, {
    description: 'OrdenCompra model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrdenCompra)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenCompra, {
            title: 'NewOrdenCompra',
            exclude: ['id'],
          }),
        },
      },
    })
    ordenCompra: Omit<OrdenCompra, 'id'>,
  ): Promise<OrdenCompra> {
    return this.ordenCompraRepository.create(ordenCompra);
  }

  @get('/ordencompras/count')
  @response(200, {
    description: 'OrdenCompra model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrdenCompra) where?: Where<OrdenCompra>,
  ): Promise<Count> {
    return this.ordenCompraRepository.count(where);
  }

  @get('/ordencompras')
  @response(200, {
    description: 'Array of OrdenCompra model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrdenCompra, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrdenCompra) filter?: Filter<OrdenCompra>,
  ): Promise<OrdenCompra[]> {
    return this.ordenCompraRepository.find(filter);
  }

  @patch('/ordencompras')
  @response(200, {
    description: 'OrdenCompra PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenCompra, {partial: true}),
        },
      },
    })
    ordenCompra: OrdenCompra,
    @param.where(OrdenCompra) where?: Where<OrdenCompra>,
  ): Promise<Count> {
    return this.ordenCompraRepository.updateAll(ordenCompra, where);
  }

  @get('/ordencompras/{id}')
  @response(200, {
    description: 'OrdenCompra model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrdenCompra, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrdenCompra, {exclude: 'where'}) filter?: FilterExcludingWhere<OrdenCompra>
  ): Promise<OrdenCompra> {
    return this.ordenCompraRepository.findById(id, filter);
  }

  @patch('/ordencompras/{id}')
  @response(204, {
    description: 'OrdenCompra PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenCompra, {partial: true}),
        },
      },
    })
    ordenCompra: OrdenCompra,
  ): Promise<void> {
    await this.ordenCompraRepository.updateById(id, ordenCompra);
  }

  @put('/ordencompras/{id}')
  @response(204, {
    description: 'OrdenCompra PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ordenCompra: OrdenCompra,
  ): Promise<void> {
    await this.ordenCompraRepository.replaceById(id, ordenCompra);
  }

  @del('/ordencompras/{id}')
  @response(204, {
    description: 'OrdenCompra DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordenCompraRepository.deleteById(id);
  }
}
