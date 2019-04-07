import { PortableQuery } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
export interface IDeleteManager {
    deleteWhere(portableQuery: PortableQuery, actor: IActor): Promise<number>;
}
export declare class DeleteManager implements IDeleteManager {
    private airDb;
    private dataStore;
    private historyManager;
    private offlineDataStore;
    private operHistoryDuo;
    private recHistoryDuo;
    private repoManager;
    private repoTransHistoryDuo;
    private transManager;
    private utils;
    constructor();
    deleteWhere(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    private recordRepositoryIds;
    private columnProcessed;
    private recordTreeToDelete;
    private getCascadeSubTree;
}
