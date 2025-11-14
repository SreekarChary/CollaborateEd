# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createProject, listPublicProjects, addProjectMember, listProjectTasks } from '@dataconnect/generated';


// Operation CreateProject:  For variables, look at type CreateProjectVars in ../index.d.ts
const { data } = await CreateProject(dataConnect, createProjectVars);

// Operation ListPublicProjects: 
const { data } = await ListPublicProjects(dataConnect);

// Operation AddProjectMember:  For variables, look at type AddProjectMemberVars in ../index.d.ts
const { data } = await AddProjectMember(dataConnect, addProjectMemberVars);

// Operation ListProjectTasks:  For variables, look at type ListProjectTasksVars in ../index.d.ts
const { data } = await ListProjectTasks(dataConnect, listProjectTasksVars);


```