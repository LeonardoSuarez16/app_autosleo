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
  Prospecto,
  Plan,
} from '../models';
import {ProspectoRepository} from '../repositories';

export class ProspectoPlanController {
  constructor(
    @repository(ProspectoRepository) protected prospectoRepository: ProspectoRepository,
  ) { }

  @get('/prospectos/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Prospecto has many Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.prospectoRepository.plans(id).find(filter);
  }

  @post('/prospectos/{id}/plans', {
    responses: {
      '200': {
        description: 'Prospecto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Prospecto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInProspecto',
            exclude: ['nombre_del_plan'],
            optional: ['prospectoId']
          }),
        },
      },
    }) plan: Omit<Plan, 'nombre_del_plan'>,
  ): Promise<Plan> {
    return this.prospectoRepository.plans(id).create(plan);
  }

  @patch('/prospectos/{id}/plans', {
    responses: {
      '200': {
        description: 'Prospecto.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.prospectoRepository.plans(id).patch(plan, where);
  }

  @del('/prospectos/{id}/plans', {
    responses: {
      '200': {
        description: 'Prospecto.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.prospectoRepository.plans(id).delete(where);
  }
}
