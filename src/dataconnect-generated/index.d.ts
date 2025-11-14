import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

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

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;
export function createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface ListPublicProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicProjectsData, undefined>;
  operationName: string;
}
export const listPublicProjectsRef: ListPublicProjectsRef;

export function listPublicProjects(): QueryPromise<ListPublicProjectsData, undefined>;
export function listPublicProjects(dc: DataConnect): QueryPromise<ListPublicProjectsData, undefined>;

interface AddProjectMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddProjectMemberVariables): MutationRef<AddProjectMemberData, AddProjectMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddProjectMemberVariables): MutationRef<AddProjectMemberData, AddProjectMemberVariables>;
  operationName: string;
}
export const addProjectMemberRef: AddProjectMemberRef;

export function addProjectMember(vars: AddProjectMemberVariables): MutationPromise<AddProjectMemberData, AddProjectMemberVariables>;
export function addProjectMember(dc: DataConnect, vars: AddProjectMemberVariables): MutationPromise<AddProjectMemberData, AddProjectMemberVariables>;

interface ListProjectTasksRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectTasksVariables): QueryRef<ListProjectTasksData, ListProjectTasksVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectTasksVariables): QueryRef<ListProjectTasksData, ListProjectTasksVariables>;
  operationName: string;
}
export const listProjectTasksRef: ListProjectTasksRef;

export function listProjectTasks(vars: ListProjectTasksVariables): QueryPromise<ListProjectTasksData, ListProjectTasksVariables>;
export function listProjectTasks(dc: DataConnect, vars: ListProjectTasksVariables): QueryPromise<ListProjectTasksData, ListProjectTasksVariables>;

