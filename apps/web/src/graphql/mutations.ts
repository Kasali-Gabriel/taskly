import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
    }
  }
`;

export const USER_LOGIN = gql`
  mutation userLogin($loginInput: LoginInput!) {
    userLogin(loginInput: $loginInput) {
      id
      email
      name
      profilePicture
      accessToken
      refreshToken
    }
  }
`;

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

export const SIGN_OUT = gql`
  mutation signOut($userId: String!) {
    signOut(userId: $userId)
  }
`;
