import { IChangeListConfig } from './ChangeListConfig';
import { ILocalStoreConfig } from './LocalStoreConfig';
import { IPersistenceConfig } from './PersistenceConfig';
import { IRemoteStoreConfig } from './RemoveStoreConfig';
/**
 * Created by Papa on 5/28/2016.
 */
export interface JsonEntityConfig {
    changeList?: string;
    localStore?: string;
}
export interface IEntityConfig {
    changeListConfig?: IChangeListConfig;
    className?: string;
    clazz?: any;
    localStoreConfig?: ILocalStoreConfig;
    remoteStoreConfig?: IRemoteStoreConfig;
}
export declare class EntityConfig implements IEntityConfig {
    className: string;
    clazz: Function;
    private config;
    private persistenceConfig;
    changeListConfig: IChangeListConfig;
    localStoreConfig: ILocalStoreConfig;
    constructor(className: string, clazz: Function, config: JsonEntityConfig, persistenceConfig: IPersistenceConfig);
}
//# sourceMappingURL=EntityConfig.d.ts.map