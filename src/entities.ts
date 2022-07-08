import Service from 'serverless/classes/Service';

/* INSOMNIA */
export interface IWorkspace {
  _id: string;
  name: string;
  description: string;
  scope: 'collection';
  _type: 'workspace';
}

export interface IParameter {
  id: string;
  name: string;
  value: string;
  description: string;
  disabled: boolean;
}

export interface IHeader {
  id: string;
  name: string;
  value: string;
  disabled: boolean;
}

export interface IAuthentication {
  type: string;
  token: string;
  disabled: boolean;
}

export interface IRequest {
  _id: string;
  parentId: string;
  url: string;
  name: string;
  description: string;
  method: string;
  body: Record<string, unknown>;
  parameters: IParameter[];
  headers: IHeader[];
  authentication: IAuthentication | {};
  isPrivate: boolean;
  settingStoreCookies: boolean;
  settingSendCookies: boolean;
  settingDisableRenderRequestBody: boolean;
  settingEncodeUrl: boolean;
  settingRebuildPath: boolean;
  settingFollowRedirects: 'global';
  _type: 'request';
}

export interface IRequestGroup {
  _id: string;
  parentId: string;
  name: string;
  description: string;
  environment: Record<string, unknown>;
  _type: 'request_group';
}

export interface IEnvironment {
  _id: string;
  parentId: string;
  name: string;
  data: Record<string, unknown>;
  color?: `#${string}`;
  isPrivate: boolean;
  dataPropertyOrder?: {
    '&': string[];
  };
  _type: 'environment';
}

export type IResources = (
  | IWorkspace
  | IRequest
  | IRequestGroup
  | IEnvironment
)[];

export interface IInsomnia {
  _type: 'export';
  __export_format: 4;
  __export_date: string;
  __export_source: string;
  resources: IResources;
}

/* SERVERLESS */
type OnlyProps<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export interface ServerlessConfiguration extends OnlyProps<Service> {
  functions: any;
  raw: any;
}

export interface IHttpEvent {
  http: {
    path: string;
    method: string;
    cors: {
      origin: string;
    };
    authorizer: string;
  };
}

export interface IServerlessFunctions {
  [F: string]: {
    handler: string;
    events: IHttpEvent[];
  };
}
