import { IRepository } from './repository';
import { IApplication } from '../infrastructure/application';
export interface IRepositoryApplication {
    id: number;
    repository: IRepository;
    application?: IApplication;
}
//# sourceMappingURL=repositoryapplication.d.ts.map