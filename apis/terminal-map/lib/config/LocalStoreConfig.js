import { StoreType } from '@airport/ground-control';
import { store } from './storeInfo';
export class CommonLocalStoreConfig {
    constructor(localStoreName, type, idGeneration) {
        this.setupInfo = {
            name: localStoreName,
            type: type,
            idGeneration: idGeneration
        };
    }
}
export function createLocalStoreConfig(localStoreName, config) {
    if (!config.type) {
        throw new Error(`Local Store Type is not specified`);
    }
    if (!config.idGeneration) {
        throw new Error(`Id Generation startegy is not specified`);
    }
    let type;
    if (typeof config.type === 'string') {
        type = store.type.getValue(config.type);
    }
    else {
        // Verify the type
        store.type.getName(config.type);
        type = config.type;
    }
    switch (type) {
        case StoreType.SQLITE:
        case StoreType.WEB_SQL:
            return new SqLiteCordovaLocalStoreConfig(localStoreName, config.type, config.idGeneration);
        case StoreType.SQLJS:
            return new SqlJsCordovaLocalStoreConfig(localStoreName, config.type, config.idGeneration);
        default:
            throw new Error(`Unsupported LocalStoreType: ${type}`);
    }
}
export class PouchDbLocalStoreConfig extends CommonLocalStoreConfig {
}
export class SqLiteCordovaLocalStoreConfig extends CommonLocalStoreConfig {
}
export class SqlJsCordovaLocalStoreConfig extends CommonLocalStoreConfig {
}
//# sourceMappingURL=LocalStoreConfig.js.map