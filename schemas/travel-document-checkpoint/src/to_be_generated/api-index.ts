import { UserAccountApi } from '../generated/api/UserAccountApi';
import { application } from './app-declaration';

export * from '../generated/api/api'

export * from '../ddl/ddl';
export * from '../generated/qApplication';
export * from '../generated/qInterfaces';
export * from '../generated/vInterfaces';
export * from '../generated/interfaces';

for (let apiStub in [
    UserAccountApi
]) {
    (apiStub as any).application = application
}