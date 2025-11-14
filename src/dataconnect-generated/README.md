# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPublicProjects*](#listpublicprojects)
  - [*ListProjectTasks*](#listprojecttasks)
- [**Mutations**](#mutations)
  - [*CreateProject*](#createproject)
  - [*AddProjectMember*](#addprojectmember)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPublicProjects
You can execute the `ListPublicProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublicProjects(): QueryPromise<ListPublicProjectsData, undefined>;

interface ListPublicProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicProjectsData, undefined>;
}
export const listPublicProjectsRef: ListPublicProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublicProjects(dc: DataConnect): QueryPromise<ListPublicProjectsData, undefined>;

interface ListPublicProjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListPublicProjectsData, undefined>;
}
export const listPublicProjectsRef: ListPublicProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublicProjectsRef:
```typescript
const name = listPublicProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListPublicProjects` query has no variables.
### Return Type
Recall that executing the `ListPublicProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublicProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPublicProjectsData {
  projects: ({
    id: UUIDString;
    title: string;
    description?: string | null;
  } & Project_Key)[];
}
```
### Using `ListPublicProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublicProjects } from '@dataconnect/generated';


// Call the `listPublicProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublicProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublicProjects(dataConnect);

console.log(data.projects);

// Or, you can use the `Promise` API.
listPublicProjects().then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListPublicProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublicProjectsRef } from '@dataconnect/generated';


// Call the `listPublicProjectsRef()` function to get a reference to the query.
const ref = listPublicProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublicProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListProjectTasks
You can execute the `ListProjectTasks` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProjectTasks(vars: ListProjectTasksVariables): QueryPromise<ListProjectTasksData, ListProjectTasksVariables>;

interface ListProjectTasksRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectTasksVariables): QueryRef<ListProjectTasksData, ListProjectTasksVariables>;
}
export const listProjectTasksRef: ListProjectTasksRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectTasks(dc: DataConnect, vars: ListProjectTasksVariables): QueryPromise<ListProjectTasksData, ListProjectTasksVariables>;

interface ListProjectTasksRef {
  ...
  (dc: DataConnect, vars: ListProjectTasksVariables): QueryRef<ListProjectTasksData, ListProjectTasksVariables>;
}
export const listProjectTasksRef: ListProjectTasksRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectTasksRef:
```typescript
const name = listProjectTasksRef.operationName;
console.log(name);
```

### Variables
The `ListProjectTasks` query requires an argument of type `ListProjectTasksVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectTasksVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectTasks` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectTasksData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectTasksData {
  tasks: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    status: string;
  } & Task_Key)[];
}
```
### Using `ListProjectTasks`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectTasks, ListProjectTasksVariables } from '@dataconnect/generated';

// The `ListProjectTasks` query requires an argument of type `ListProjectTasksVariables`:
const listProjectTasksVars: ListProjectTasksVariables = {
  projectId: ..., 
};

// Call the `listProjectTasks()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectTasks(listProjectTasksVars);
// Variables can be defined inline as well.
const { data } = await listProjectTasks({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectTasks(dataConnect, listProjectTasksVars);

console.log(data.tasks);

// Or, you can use the `Promise` API.
listProjectTasks(listProjectTasksVars).then((response) => {
  const data = response.data;
  console.log(data.tasks);
});
```

### Using `ListProjectTasks`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectTasksRef, ListProjectTasksVariables } from '@dataconnect/generated';

// The `ListProjectTasks` query requires an argument of type `ListProjectTasksVariables`:
const listProjectTasksVars: ListProjectTasksVariables = {
  projectId: ..., 
};

// Call the `listProjectTasksRef()` function to get a reference to the query.
const ref = listProjectTasksRef(listProjectTasksVars);
// Variables can be defined inline as well.
const ref = listProjectTasksRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectTasksRef(dataConnect, listProjectTasksVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tasks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tasks);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateProject
You can execute the `CreateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectRef:
```typescript
const name = createProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateProject` mutation requires an argument of type `CreateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectVariables {
  title: string;
  description: string;
  isPublic: boolean;
}
```
### Return Type
Recall that executing the `CreateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProject, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  title: ..., 
  description: ..., 
  isPublic: ..., 
};

// Call the `createProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProject(createProjectVars);
// Variables can be defined inline as well.
const { data } = await createProject({ title: ..., description: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProject(dataConnect, createProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProject(createProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectRef, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  title: ..., 
  description: ..., 
  isPublic: ..., 
};

// Call the `createProjectRef()` function to get a reference to the mutation.
const ref = createProjectRef(createProjectVars);
// Variables can be defined inline as well.
const ref = createProjectRef({ title: ..., description: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectRef(dataConnect, createProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## AddProjectMember
You can execute the `AddProjectMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addProjectMember(vars: AddProjectMemberVariables): MutationPromise<AddProjectMemberData, AddProjectMemberVariables>;

interface AddProjectMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddProjectMemberVariables): MutationRef<AddProjectMemberData, AddProjectMemberVariables>;
}
export const addProjectMemberRef: AddProjectMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addProjectMember(dc: DataConnect, vars: AddProjectMemberVariables): MutationPromise<AddProjectMemberData, AddProjectMemberVariables>;

interface AddProjectMemberRef {
  ...
  (dc: DataConnect, vars: AddProjectMemberVariables): MutationRef<AddProjectMemberData, AddProjectMemberVariables>;
}
export const addProjectMemberRef: AddProjectMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addProjectMemberRef:
```typescript
const name = addProjectMemberRef.operationName;
console.log(name);
```

### Variables
The `AddProjectMember` mutation requires an argument of type `AddProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddProjectMemberVariables {
  projectId: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `AddProjectMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddProjectMemberData {
  projectMember_insert: ProjectMember_Key;
}
```
### Using `AddProjectMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addProjectMember, AddProjectMemberVariables } from '@dataconnect/generated';

// The `AddProjectMember` mutation requires an argument of type `AddProjectMemberVariables`:
const addProjectMemberVars: AddProjectMemberVariables = {
  projectId: ..., 
  role: ..., 
};

// Call the `addProjectMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addProjectMember(addProjectMemberVars);
// Variables can be defined inline as well.
const { data } = await addProjectMember({ projectId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addProjectMember(dataConnect, addProjectMemberVars);

console.log(data.projectMember_insert);

// Or, you can use the `Promise` API.
addProjectMember(addProjectMemberVars).then((response) => {
  const data = response.data;
  console.log(data.projectMember_insert);
});
```

### Using `AddProjectMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addProjectMemberRef, AddProjectMemberVariables } from '@dataconnect/generated';

// The `AddProjectMember` mutation requires an argument of type `AddProjectMemberVariables`:
const addProjectMemberVars: AddProjectMemberVariables = {
  projectId: ..., 
  role: ..., 
};

// Call the `addProjectMemberRef()` function to get a reference to the mutation.
const ref = addProjectMemberRef(addProjectMemberVars);
// Variables can be defined inline as well.
const ref = addProjectMemberRef({ projectId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addProjectMemberRef(dataConnect, addProjectMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectMember_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectMember_insert);
});
```

