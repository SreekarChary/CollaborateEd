const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'collaborateed',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createProjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProject', inputVars);
}
createProjectRef.operationName = 'CreateProject';
exports.createProjectRef = createProjectRef;

exports.createProject = function createProject(dcOrVars, vars) {
  return executeMutation(createProjectRef(dcOrVars, vars));
};

const listPublicProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicProjects');
}
listPublicProjectsRef.operationName = 'ListPublicProjects';
exports.listPublicProjectsRef = listPublicProjectsRef;

exports.listPublicProjects = function listPublicProjects(dc) {
  return executeQuery(listPublicProjectsRef(dc));
};

const addProjectMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddProjectMember', inputVars);
}
addProjectMemberRef.operationName = 'AddProjectMember';
exports.addProjectMemberRef = addProjectMemberRef;

exports.addProjectMember = function addProjectMember(dcOrVars, vars) {
  return executeMutation(addProjectMemberRef(dcOrVars, vars));
};

const listProjectTasksRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjectTasks', inputVars);
}
listProjectTasksRef.operationName = 'ListProjectTasks';
exports.listProjectTasksRef = listProjectTasksRef;

exports.listProjectTasks = function listProjectTasks(dcOrVars, vars) {
  return executeQuery(listProjectTasksRef(dcOrVars, vars));
};
