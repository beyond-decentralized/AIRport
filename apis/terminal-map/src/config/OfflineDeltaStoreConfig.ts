import { deltaConst }               from '@airport/air-control';
import { PlatformType }             from '@airport/ground-control';
import type { StoreType }                from '@airport/ground-control';
import type { SharingPlatformSetupInfo } from '../SharingAdaptor';
import type { IDeltaStoreConfig }        from './DeltaStoreConfig';

/**
 * Created by Papa on 9/24/2016.
 */

export interface JsonOfflineDeltaStoreConfig {
	type: StoreType;
}

export interface IOfflineDeltaStoreConfig {
	// changeListConfig:IChangeListConfig;
	config: JsonOfflineDeltaStoreConfig;
	type: StoreType;
}

export class OfflineDeltaStoreConfig
	implements IOfflineDeltaStoreConfig {

	// changeListConfig:IChangeListConfig;
	setupInfo: SharingPlatformSetupInfo;
	type: StoreType;

	constructor(
		public config: JsonOfflineDeltaStoreConfig,
		deltaStoreConfig: IDeltaStoreConfig
	) {
		let changeListConfig = deltaStoreConfig.changeListConfig;
		this.type            = config.type;
		this.setupInfo       = {
			platformType: PlatformType.OFFLINE,
			recordIdField: deltaStoreConfig.config.recordIdField,
			dbIdField: deltaConst.DB_ID_FIELD
		};
	}

}
