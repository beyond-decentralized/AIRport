import { PortableQuery } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
export interface IUpdateManager {
    updateValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
}
export declare class UpdateManager implements IUpdateManager {
    private airDb;
    private dataStore;
    private histManager;
    private offlineDataStore;
    private operHistoryDmo;
    private recHistoryDmo;
    private repoManager;
    private repoTransHistoryDmo;
    private transManager;
    private utils;
    constructor();
    updateValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    private addUpdateHistory;
    private addNewValueHistory;
    private groupRecordsByRepository;
}
