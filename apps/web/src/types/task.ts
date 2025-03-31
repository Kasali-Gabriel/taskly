import { UseFormReturn } from 'react-hook-form';
export interface Project {
  id: string;
  name: string;
  description?: string;
  projectOwnerId: string;
  teamId: string;
  startDate: Date;
  endDate: Date;
  createdOn: Date;
  modifiedOn: Date;
  tasks: Task[];
  projectMembers: ProjectMember[];
  team: Team;
}

export interface Team {
  id: string;
  name: string;
  teamOwnerId?: string;
  projects: Project[];
  members: TeamUser[];
}

export interface TeamUser {
  userId: string;
  teamId: string;
  user: User;
  team: Team;
}

export interface ProjectMember {
  projectId: string;
  userId: string;
  project: Project;
  user: User;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  projectId?: string;
  authorId: string;
  assigneeId?: string;
  author: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export enum Status {
  ToDo = 'To do',
  InProgress = 'In Progress',
  UnderReview = 'Under Review',
  Completed = 'Completed',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  teamId: string;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  taskId: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  taskId: string;
  uploadedById: string;
}

export interface TaskColumnProps {
  status: Status;
  tasks: Task[];
  moveTask: (taskId: string, newStatus: Status) => void;
}

export type TaskTypeItems = 'task' | 'milestone' | 'project';

