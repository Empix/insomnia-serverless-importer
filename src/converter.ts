import path from 'path';
import Service from 'serverless/classes/Service';
import { v4 } from 'uuid';
import {
  IEnvironment,
  IInsomnia,
  IRequest,
  IRequestGroup,
  IResources,
  IServerlessFunctions,
  IWorkspace,
  ServerlessConfiguration,
} from './entities';
import { getCommonWord } from './utils/getCommonWord';
import { splitCamelCase } from './utils/splitCamelCase';

export function convert(configuration: ServerlessConfiguration): IInsomnia {
  const serverlessFunctions = configuration.functions;
  const resources: IResources = [];

  // WORKSPACE
  const workspace: IWorkspace = createWorkspace(configuration.service);
  resources.push(workspace);

  // ENVIRONMENTS
  const baseEnvId = `base_ENV.${v4()}`;
  const environments: IEnvironment[] = [
    {
      _id: baseEnvId,
      parentId: workspace._id,
      name: 'Base Environment',
      data: {},
      isPrivate: false,
      _type: 'environment',
    },
    {
      _id: `dev_ENV.${v4()}`,
      parentId: baseEnvId,
      name: 'Dev',
      data: {
        URL: `http://localhost:${configuration.custom['serverless-offline'].httpPort}/${configuration.provider.stage}`,
      },
      color: '#1abc9c',
      isPrivate: false,
      _type: 'environment',
    },
  ];
  resources.push(...environments);

  // REQUESTS
  if (Array.isArray(serverlessFunctions)) {
    // const groupNames = serverlessFunctions.map(Object.keys).map(getCommonWord);
    const groupNames = configuration.raw.functions.map(
      (functionPath: string) => {
        const name = [
          ...path.basename(functionPath.replace(/[\(\{\}\)]/g, ''), '.yml'),
        ];

        name[0] = String.fromCharCode(name[0].charCodeAt(0) - 32);
        return splitCamelCase(name.join('')).join(' ');
      }
    );
    console.log(groupNames);

    const requestGroups = groupNames.map(
      (name: string): IRequestGroup => ({
        _id: `${name}-${Date.now()}`,
        parentId: workspace._id,
        name,
        description: '',
        environment: {},
        _type: 'request_group',
      })
    );

    const requests = serverlessFunctions.flatMap(
      (functionGroup: IServerlessFunctions, index: number) => {
        const functionRequests: IRequest[] = [];

        for (const functionName in functionGroup) {
          const httpEvent = functionGroup[functionName].events?.[0]?.http;
          if (!httpEvent) continue;

          functionRequests.push(
            createRequest(
              requestGroups[index]._id,
              `{{ _.URL }}/${httpEvent.path}`,
              functionName,
              httpEvent.method
            )
          );
        }

        return functionRequests;
      }
    );

    resources.push(...requestGroups);
    resources.push(...requests);
  } else {
    const requests: IRequest[] = [];

    for (const functionName in serverlessFunctions) {
      const httpEvent = serverlessFunctions[functionName].events?.[0]?.http;
      if (!httpEvent) continue;

      requests.push(
        createRequest(
          workspace._id,
          `{{ _.URL }}/${httpEvent.path}`,
          functionName,
          httpEvent.method
        )
      );
    }

    resources.push(...requests);
  }

  return {
    _type: 'export',
    __export_format: 4,
    __export_date: new Date().toISOString(),
    __export_source: 'serverless.functions.exporter',
    resources,
  };
}

function createRequest(
  parentId: string,
  url: string,
  name: string,
  method: string
) {
  const request: IRequest = {
    _id: `REQ.${v4()}`,
    parentId,
    url,
    name,
    description: '',
    method: method.toUpperCase(),
    body: {},
    parameters: [],
    headers: [],
    authentication: {},
    isPrivate: false,
    settingStoreCookies: true,
    settingSendCookies: true,
    settingDisableRenderRequestBody: false,
    settingEncodeUrl: true,
    settingRebuildPath: true,
    settingFollowRedirects: 'global',
    _type: 'request',
  };

  return request;
}

function createWorkspace(name: string | null = '', description: string = '') {
  const defaultName = `New - ${new Date().toLocaleDateString()}`;

  const workspace: IWorkspace = {
    _id: `WRK.${v4()}`,
    name: name || defaultName,
    description,
    scope: 'collection',
    _type: 'workspace',
  };

  return workspace;
}
