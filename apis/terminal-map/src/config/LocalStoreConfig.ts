import { IdGeneration, store, StoreSetupInfo, StoreType } from "./storeInfo";

/**
 * Created by Papa on 5/28/2016.
 */
export interface JsonLocalStoreConfig {
	type: StoreType | string;
	idGeneration: IdGeneration;
}

export interface ILocalStoreConfig {
	setupInfo: StoreSetupInfo;
}

export class CommonLocalStoreConfig implements ILocalStoreConfig {

	setupInfo: StoreSetupInfo;

	constructor(
		localStoreName: string,
		type: StoreType,
		idGeneration: IdGeneration
	) {

		this.setupInfo = {
			name: localStoreName,
			type: type,
			idGeneration: idGeneration
		};
	}
}

export function createLocalStoreConfig(
	localStoreName: string,
	config: JsonLocalStoreConfig
): ILocalStoreConfig {
	if (!config.type && config.type !== 0) {
		throw `Local Store Type is not specified`;
	}
	if (!config.idGeneration && config.idGeneration !== 0) {
		throw `Id Generation startegy is not specified`;
	}

	let type: StoreType;

	if (typeof config.type === "string") {
		type = store.type.getValue(<string>config.type);
	} else {
		// Verify the type
		store.type.getName(<StoreType>config.type);
		type = <StoreType>config.type;
	}

	switch (type) {
		case StoreType.SQLITE_CORDOVA:
			return new SqLiteCordovaLocalStoreConfig(localStoreName, <StoreType>config.type, config.idGeneration);
		case StoreType.SQLJS:
			return new SqlJsCordovaLocalStoreConfig(localStoreName, <StoreType>config.type, config.idGeneration);
		default:
			throw `Unsupported LocalStoreType: ${type}`;
	}
}

export interface IPouchDbLocalStoreConfig extends ILocalStoreConfig {
}

export class PouchDbLocalStoreConfig extends CommonLocalStoreConfig implements IPouchDbLocalStoreConfig {

}

export interface ISqLiteCordovaLocalStoreConfig extends ILocalStoreConfig {
}

export class SqLiteCordovaLocalStoreConfig extends CommonLocalStoreConfig implements SqLiteCordovaLocalStoreConfig {

}

export interface ISqlJsCordovaLocalStoreConfig extends ILocalStoreConfig {
}

export class SqlJsCordovaLocalStoreConfig extends CommonLocalStoreConfig implements SqlJsCordovaLocalStoreConfig {

}