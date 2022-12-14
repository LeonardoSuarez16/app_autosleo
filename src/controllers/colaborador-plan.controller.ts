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
  Colaborador,
  Plan,
} from '../models';
import {ColaboradorRepository} from '../repositories';

export class ColaboradorPlanController {
  constructor(
    @repository(ColaboradorRepository) protected colaboradorRepository: ColaboradorRepository,
  ) { }

  @get('/colaboradors/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Colaborador has many Plan',
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
    return this.colaboradorRepository.plans(id).find(filter);
  }

  @post('/colaboradors/{id}/plans', {
    responses: {
      '200': {
        description: 'Colaborador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colaborador.prototype.cargo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInColaborador',
            exclude: ['nombre_del_plan'],
            optional: ['colaboradorId']
          }),
        },
      },
    }) plan: Omit<Plan, 'nombre_del_plan'>,
  ): Promise<Plan> {
    return this.colaboradorRepository.plans(id).create(plan);
  }

  @patch('/colaboradors/{id}/plans', {
    responses: {
      '200': {
        description: 'Colaborador.Plan PATCH success count',
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
    return this.colaboradorRepository.plans(id).patch(plan, where);
  }

  @del('/colaboradors/{id}/plans', {
    responses: {
      '200': {
        description: 'Colaborador.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.colaboradorRepository.plans(id).delete(where);
  }
}
