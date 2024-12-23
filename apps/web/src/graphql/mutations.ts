import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      title
      description
      status
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($updateTaskStatusInput: UpdateTaskStatusInput!) {
    updateTaskStatus(updateTaskStatusInput: $updateTaskStatusInput) {
      id
      status
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      id
      name
      description
      startDate
      endDate
    }
  }
`;
