import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from 'src/models/Project';
import { ProjectMember } from 'src/models/ProjectMember';
import { Task } from 'src/models/Task';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return await this.projectService.createProject(createProjectInput);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('projectId') projectId: string,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return await this.projectService.updateProject(
      projectId,
      updateProjectInput,
    );
  }

  @Mutation(() => ProjectMember)
  async addUserToProject(
    @Args('projectId') projectId: string,
    @Args('userId') userId: string,
  ) {
    return await this.projectService.addUserToProject(projectId, userId);
  }

  @Query(() => Project)
  async getProjectById(@Args('projectId') projectId: string) {
    return await this.projectService.getProjectById(projectId);
  }

  @Query(() => [Project])
  async getProjectsForUser(@Args('userId') userId: string) {
    return this.projectService.getProjectsForUser(userId);
  }

  @Query(() => [ProjectMember])
  async getMembersOfProject(@Args('projectId') projectId: string) {
    return await this.projectService.getMembersOfProject(projectId);
  }

  @Mutation(() => Project)
  async deleteProject(@Args('projectId') projectId: string) {
    return await this.projectService.deleteProject(projectId);
  }
}
