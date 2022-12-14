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
  Plan,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPlanController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Plan',
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
    return this.usuarioRepository.plans(id).find(filter);
  }

  @post('/usuarios/{id}/plans', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInUsuario',
            exclude: ['nombre_del_plan'],
            optional: ['usuarioId']
          }),
        },
      },
    }) plan: Omit<Plan, 'nombre_del_plan'>,
  ): Promise<Plan> {
    return this.usuarioRepository.plans(id).create(plan);
  }

  @patch('/usuarios/{id}/plans', {
    responses: {
      '200': {
        description: 'Usuario.Plan PATCH success count',
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
    return this.usuarioRepository.plans(id).patch(plan, where);
  }

  @del('/usuarios/{id}/plans', {
    responses: {
      '200': {
        description: 'Usuario.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.usuarioRepository.plans(id).delete(where);
  }
}
