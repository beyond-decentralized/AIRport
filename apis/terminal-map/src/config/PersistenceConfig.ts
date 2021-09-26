import {
	DistributionStrategy,
	IdGeneration,
	PlatformType,
	StoreType
} from "@airport/ground-control";
import {
	createDeltaStoreConfig,
	IDeltaStoreConfig,
	JsonDeltaStoreConfig
} from "./DeltaStoreConfig";
import {
	createLocalStoreConfig,
	ILocalStoreConfig,
	JsonLocalStoreConfig
} from "./LocalStoreConfig";

/**
 * Created by Papa on 5/28/2016.
 */

export interface JsonPersistenceConfig<DSC extends JsonDeltaStoreConfig> {
	appName: string;
	deltaStore?: DSC;
	localStore?: JsonLocalStoreConfig;
}

export interface IPersistenceConfig {

	deltaStoreConfig: IDeltaStoreConfig;
	localStoreConfig: ILocalStoreConfig;
	appName: string;

}

export class PersistenceConfig<DSC extends JsonDeltaStoreConfig> implements IPersistenceConfig {

	static getDefaultJsonConfig(
		appName: string = 'DefaultApp',
		distributionStrategy: DistributionStrategy = DistributionStrategy.S3_SECURE_POLL,
		deltaStorePlatform: PlatformType = PlatformType.GOOGLE_DOCS,
		localStoreType: StoreType = StoreType.SQLITE,
		offlineDeltaStoreType: StoreType = StoreType.SQLITE,
		idGeneration: IdGeneration = IdGeneration.ENTITY_CHANGE_ID
	): JsonPersistenceConfig<JsonDeltaStoreConfig> {
		return {
			appName: appName,
			deltaStore: {
				changeList: {
					distributionStrategy: distributionStrategy
				},
				offlineDeltaStore: {
					type: offlineDeltaStoreType
				},
				recordIdField: "id",
				platform: deltaStorePlatform
			},
			localStore: {
				type: localStoreType,
				idGeneration: idGeneration
			}
		};
	}

	deltaStoreConfig: IDeltaStoreConfig;
	localStoreConfig: ILocalStoreConfig;
	appName: string;

	constructor(
		private config: JsonPersistenceConfig<DSC>
	) {
		this.appName = config.appName;
		if (config.deltaStore) {
			let jsonDeltaStoreConfig = config.deltaStore;
			this.deltaStoreConfig = createDeltaStoreConfig(jsonDeltaStoreConfig);
		}

		if (config.localStore) {
			this.localStoreConfig = createLocalStoreConfig(config.appName, config.localStore);
		}
	}

}