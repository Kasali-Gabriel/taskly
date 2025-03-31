import { gql } from '@apollo/client';

export const TASK_FIELDS = gql`
  fragment TaskFields on Task {
    id
    title
    description
    status
    priority
    tags
    startDate
    dueDate
    author {
      id
      name
      email
      profilePicture
    }
    assignee {
      id
      name
      email
      profilePicture
    }
    attachments {
      id
      url
      name
    }
    comments {
      id
      text
      user {
        id
        name
        profilePicture
      }
    }
  }
`;

export const GET_TASKS_BY_USER = gql`
  query GetTasksByUser($userId: String!) {
    tasksByUser(userId: $userId) {
      ...TaskFields
    }
  }
  ${TASK_FIELDS}
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($projectId: String!) {
    getProjectById(projectId: $projectId) {
      id
      name
      description
      startDate
      endDate
      createdOn
      modifiedOn
      tasks {
        ...TaskFields
      }
      projectMembers {
        user {
          id
          name
          email
          profilePicture
        }
      }
      team {
        name
      }
      projectOwner {
        name
        email
        profilePicture
      }
    }
  }
  ${TASK_FIELDS}
`;

export const GET_PROJECTS_FOR_USER = gql`
  query GetProjectsForUser($userId: String!) {
    getProjectsForUser(userId: $userId) {
      id
      name
      endDate
      modifiedOn
      createdOn
      projectMembers {
        user {
          id
          name
          email
          profilePicture
        }
      }
    }
  }
`;

export const GET_TEAMS_FOR_USER = gql`
  query GetTeamsForUser($userId: String!) {
    getTeamsForUser(userId: $userId) {
      id
      name
    }
  }
`;
