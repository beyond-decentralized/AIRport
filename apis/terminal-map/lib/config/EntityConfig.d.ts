import type { IChangeListConfig } from './ChangeListConfig';
import type { ILocalStoreConfig } from './LocalStoreConfig';
import type { IPersistenceConfig } from './PersistenceConfig';
import type { IRemoteStoreConfig } from './RemoveStoreConfig';
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