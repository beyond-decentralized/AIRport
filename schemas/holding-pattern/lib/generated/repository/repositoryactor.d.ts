import { IRepository } from './repository';
import { IActor } from '../infrastructure/actor';
export interface IRepositoryActor {
    id: number;
    repository: IRepository;
    actor?: IActor;
}
//# sourceMappingURL=repositoryactor.d.ts.map