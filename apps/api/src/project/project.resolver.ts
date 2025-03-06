import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from 'src/models/Project';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async getProjects() {
    return await this.projectService.findAll();
  }

  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return await this.projectService.create(createProjectInput);
  }
}
