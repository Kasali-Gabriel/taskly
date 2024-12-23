import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

export const GET_TEAMS = gql`
  query GetTeams {
    getTeams {
      id
      name
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($projectId: String!) {
    tasks(projectId: $projectId) {
      id
      title
      description
      status
    }
  }
`;

export const GET_TASKS_BY_USER = gql`
  query GetTasksByUser($userId: String!) {
    tasksByUser(userId: $userId) {
      id
      title
      description
      status
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      name
      description
    }
  }
`;
