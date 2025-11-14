import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AddProjectMemberData {
  projectMember_insert: ProjectMember_Key;
}

export interface AddProjectMemberVariables {
  projectId: UUIDString;
  role: string;
}

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateProjectVariables {
  title: string;
  description: string;
  isPublic: boolean;
}

export interface Discussion_Key {
  id: UUIDString;
  __typename?: 'Discussion_Key';
}

export interface File_Key {
  id: UUIDString;
  __typename?: 'File_Key';
}

export interface ListProjectTasksData {
  tasks: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    status: string;
  } & Task_Key)[];
}

export interface ListProjectTasksVariables {
  projectId: UUIDString;
}

export interface ListPublicProjectsData {
  projects: ({
    id: UUIDString;
    title: string;
    description?: string | null;
  } & Project_Key)[];
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface ProjectMember_Key {
  userId: UUIDString;
  projectId: UUIDString;
  __typename?: 'ProjectMember_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateProject' Mutation. Allow users to execute without passing in DataConnect. */
export function createProject(dc: DataConnect, vars: CreateProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectData>>;
/** Generated Node Admin SDK operation action function for the 'CreateProject' Mutation. Allow users to pass in custom DataConnect instances. */
export function createProject(vars: CreateProjectVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateProjectData>>;

/** Generated Node Admin SDK operation action function for the 'ListPublicProjects' Query. Allow users to execute without passing in DataConnect. */
export function listPublicProjects(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublicProjectsData>>;
/** Generated Node Admin SDK operation action function for the 'ListPublicProjects' Query. Allow users to pass in custom DataConnect instances. */
export function listPublicProjects(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublicProjectsData>>;

/** Generated Node Admin SDK operation action function for the 'AddProjectMember' Mutation. Allow users to execute without passing in DataConnect. */
export function addProjectMember(dc: DataConnect, vars: AddProjectMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddProjectMemberData>>;
/** Generated Node Admin SDK operation action function for the 'AddProjectMember' Mutation. Allow users to pass in custom DataConnect instances. */
export function addProjectMember(vars: AddProjectMemberVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddProjectMemberData>>;

/** Generated Node Admin SDK operation action function for the 'ListProjectTasks' Query. Allow users to execute without passing in DataConnect. */
export function listProjectTasks(dc: DataConnect, vars: ListProjectTasksVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectTasksData>>;
/** Generated Node Admin SDK operation action function for the 'ListProjectTasks' Query. Allow users to pass in custom DataConnect instances. */
export function listProjectTasks(vars: ListProjectTasksVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListProjectTasksData>>;

