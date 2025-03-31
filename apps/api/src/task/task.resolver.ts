import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskStatusInput } from './dto/update-task-status.input';
import { Task } from 'src/models/Task';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => Task)
  updateTaskStatus(
    @Args('updateTaskStatusInput') updateTaskStatusInput: UpdateTaskStatusInput,
  ) {
    return this.taskService.updateTaskStatus(
      updateTaskStatusInput.taskId,
      updateTaskStatusInput.status,
    );
  }

  @Query(() => [Task], { name: 'tasksByUser' })
  getTasksForUser(@Args('userId') userId: string) {
    return this.taskService.getTasksForUser(userId);
  }
}
