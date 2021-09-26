import { deltaConst } from '@airport/air-control'
import type { DistributionStrategy } from '@airport/ground-control'
import type {
	ChangeListShareInfo
} from '../SharingAdaptor'
import {
	deltaStore
} from '../SharingAdaptor'
import type { IDeltaStoreConfig } from './DeltaStoreConfig'

/**
 * Created by Papa on 5/28/2016.
 */


export interface JsonChangeListConfig {
	distributionStrategy?: DistributionStrategy | string;
}

export interface IChangeListConfig {
	changeListInfo?: ChangeListShareInfo;
	deltaStoreConfig: IDeltaStoreConfig;
	distributionStrategy: DistributionStrategy;
	exists?: boolean;
}

export class ChangeListConfig
	implements IChangeListConfig {

	changeListInfo: ChangeListShareInfo
	distributionStrategy: DistributionStrategy

	constructor(
		private config: JsonChangeListConfig,
		public deltaStoreConfig: IDeltaStoreConfig
	) {
		this.deltaStoreConfig = deltaStoreConfig

		let distributionStrategy = config.distributionStrategy
		if (!distributionStrategy) {
			throw new Error(`Distribution Strategy is not defined`)
		}
		if (typeof distributionStrategy === 'string') {
			this.distributionStrategy = deltaStore.distributionStrategy.getValue(<string>distributionStrategy)
		} else {
			// Verify the distributionStrategy
			deltaStore.distributionStrategy.getName(<DistributionStrategy>config.distributionStrategy)
			this.distributionStrategy = <DistributionStrategy>config.distributionStrategy
		}

		this.changeListInfo = {
			name: 'Transactions',
			dbId: deltaConst.DB_ID_FIELD
		}
	}

}
