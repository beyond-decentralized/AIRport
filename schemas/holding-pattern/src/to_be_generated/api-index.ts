import { RepositoryApi } from '../generated/api/repository/RepositoryApi';
import { application } from './app-declaration';

export * from '../types';
export * from '../ddl/ddl';
export * from '../generated/qApplication';
export * from '../generated/qInterfaces';
export * from '../generated/vInterfaces';
export * from '../generated/interfaces';
export * from '../generated/api/api';

for (let apiStub of [RepositoryApi]) {
    (apiStub as any).application = application
}