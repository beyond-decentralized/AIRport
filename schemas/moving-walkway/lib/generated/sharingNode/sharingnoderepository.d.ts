import { ISharingNode } from './sharingnode';
import { IRepository } from '@airport/holding-pattern';
export interface ISharingNodeRepository {
    sharingNode: ISharingNode;
    repository: IRepository;
    agtRepositoryId?: number;
    advisedSyncPriority?: number;
    repositorySyncStatus?: number;
}
//# sourceMappingURL=sharingnoderepository.d.ts.map