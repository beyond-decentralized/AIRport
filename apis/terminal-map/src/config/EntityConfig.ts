import {ILocalStoreConfig} from "./LocalStoreConfig";
import {IChangeListConfig} from "./ChangeListConfig";
import {IPersistenceConfig} from "./PersistenceConfig";
import {IRemoteStoreConfig} from "./RemoveStoreConfig";

/**
 * Created by Papa on 5/28/2016.
 */

export interface JsonEntityConfig {
	changeList?:string;
	localStore?:string;
}

export interface IEntityConfig {
	changeListConfig?:IChangeListConfig;
	className?:string;
	clazz?:any;
	localStoreConfig?:ILocalStoreConfig;
	remoteStoreConfig?:IRemoteStoreConfig;
}

export class EntityConfig implements IEntityConfig {

	changeListConfig:IChangeListConfig;
	localStoreConfig:ILocalStoreConfig;

	constructor(
		public className:string,
		public clazz:Function,
		private config:JsonEntityConfig,
		private persistenceConfig:IPersistenceConfig //
	) {
		if (!config) {
			throw `Entity Configuration not specified`;
		}
/*		let changeListName = config.changeList;
		if (changeListName) {
			let changeListConfig = persistenceConfig.changeListConfigMap[changeListName];
			if (!changeListConfig) {
				throw `Unknown Change List: ${changeListName} for Entity ${className}`;
			}
			this.changeListConfig = changeListConfig;
		}
		let localStoreName = config.localStore;
		if (localStoreName) {
			let localStoreConfig = persistenceConfig.localStoreConfigMap[localStoreName];
			if (!localStoreConfig) {
				throw `Unknown Local Store: ${localStoreName} for Entity ${className}`;
			}
			this.localStoreConfig = localStoreConfig;
		}

		if(!this.changeListConfig && !this.localStoreConfig) {
			throw `Entity Configuration does not specify a Change List or a Local Store`;
		}*/
	}

}