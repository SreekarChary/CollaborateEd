import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'collaborateed',
  location: 'us-east4'
};

export const createProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject', inputVars);
}
createProjectRef.operationName = 'CreateProject';

export function createProject(dcOrVars, vars) {
  return executeMutation(createProjectRef(dcOrVars, vars));
}

export const listPublicProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicProjects');
}
listPublicProjectsRef.operationName = 'ListPublicProjects';

export function listPublicProjects(dc) {
  return executeQuery(listPublicProjectsRef(dc));
}

export const addProjectMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddProjectMember', inputVars);
}
addProjectMemberRef.operationName = 'AddProjectMember';

export function addProjectMember(dcOrVars, vars) {
  return executeMutation(addProjectMemberRef(dcOrVars, vars));
}

export const listProjectTasksRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectTasks', inputVars);
}
listProjectTasksRef.operationName = 'ListProjectTasks';

export function listProjectTasks(dcOrVars, vars) {
  return executeQuery(listProjectTasksRef(dcOrVars, vars));
}

