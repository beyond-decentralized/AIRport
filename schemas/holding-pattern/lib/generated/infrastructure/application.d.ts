import { IActorApplication } from './actorapplication';
import { IRepositoryApplication } from '../repository/repositoryapplication';
export interface IApplication {
    id: number;
    host?: string;
    port?: number;
    actorApplications?: IActorApplication[];
    repositoryApplications?: IRepositoryApplication[];
}
//# sourceMappingURL=application.d.ts.map