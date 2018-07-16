import { deltaConst } from "@airport/air-control";
import { ChangeListConfig, IChangeListConfig, JsonChangeListConfig } from "./ChangeListConfig";
import {
	IOfflineDeltaStoreConfig,
	JsonOfflineDeltaStoreConfig,
	OfflineDeltaStoreConfig
} from "./OfflineDeltaStoreConfig";
import { PlatformType } from "./PlatformType";
import { deltaStore, SharingPlatformSetupInfo } from "../SharingAdaptor";
import { GoogleSetupInfo } from "./GoogleSharingModel";

/**
 * Created by Papa on 5/31/2016.
 */

export interface JsonDeltaStoreConfig {
	changeList?: JsonChangeListConfig;
	offlineDeltaStore?: JsonOfflineDeltaStoreConfig;
	platform: PlatformType | string;
	recordIdField: string;
}

export interface JsonGoogleDeltaStoreConfig extends JsonDeltaStoreConfig {
	apiKey: string;
	clientId: string;
	rootFolder: string;
}

export interface IDeltaStoreConfig {
	changeListConfig: IChangeListConfig;
	config: JsonDeltaStoreConfig;
	offlineDeltaStore: IOfflineDeltaStoreConfig;
	setupInfo: SharingPlatformSetupInfo;
}

export class DeltaStoreConfig implements IDeltaStoreConfig {

	changeListConfig: IChangeListConfig;
	offlineDeltaStore: IOfflineDeltaStoreConfig;
	setupInfo: SharingPlatformSetupInfo;

	constructor(
		public config: JsonDeltaStoreConfig
	) {
		if (!config.platform && config.platform !== 0) {
			throw `Sharing Platform is not defined `;
		}

		let platformType: PlatformType = getPlatformType(config.platform);
		this.setupInfo = {
			platformType: platformType,
			recordIdField: config.recordIdField,
			dbIdField: deltaConst.DB_ID_FIELD
		};
		if (!config.changeList) {
			throw `ChangeList config is not defined`;
		}
		if (!config.offlineDeltaStore) {
			throw `OfflineDeltaStore must be specified if changeLists are specified.`;
		}
		this.changeListConfig = new ChangeListConfig(config.changeList, this);
		this.offlineDeltaStore = new OfflineDeltaStoreConfig(config.offlineDeltaStore, this);
	}
}

export function getPlatformType(
	platform: PlatformType | string
): PlatformType {
	let platformType: PlatformType;
	if (typeof platform === "string") {
		platformType = deltaStore.platform.getValue(<string>platform);
	} else {
		// Verify the platform
		deltaStore.platform.getName(<PlatformType>platform);
		platformType = <PlatformType>platform;
	}

	return platformType;
}

export interface IGoogleDeltaStoreConfig extends IDeltaStoreConfig {
	setupInfo: GoogleSetupInfo;
}

export class GoogleDeltaStoreConfig extends DeltaStoreConfig implements IGoogleDeltaStoreConfig {

	setupInfo: GoogleSetupInfo;

	constructor(
		config: JsonGoogleDeltaStoreConfig
	) {
		super(config);
		if (!config.rootFolder) {
			throw `Root folder is not defined`;
		}
		if (!config.apiKey) {
			throw `ApiKey is not defined`;
		}
		if (!config.clientId) {
			throw `ClientId is not defined`;
		}

		this.setupInfo.rootFolder = config.rootFolder;
		this.setupInfo.apiKey = config.apiKey;
		this.setupInfo.clientId = config.clientId;
	}
}

export class InMemoryDeltaStoreConfig extends DeltaStoreConfig {
}

export class StubDeltaStoreConfig extends DeltaStoreConfig {
}

export function createDeltaStoreConfig(
	jsonDeltaStoreConfig: JsonDeltaStoreConfig
): IDeltaStoreConfig {
	if (!jsonDeltaStoreConfig.platform && jsonDeltaStoreConfig.platform !== 0) {
		throw `deltaStore.platform is nod specified`;
	}
	let platformType: PlatformType = getPlatformType(jsonDeltaStoreConfig.platform);

	switch (platformType) {
		case PlatformType.GOOGLE_DOCS:
			return new GoogleDeltaStoreConfig(<JsonGoogleDeltaStoreConfig>jsonDeltaStoreConfig);
		case PlatformType.IN_MEMORY:
			return new InMemoryDeltaStoreConfig(jsonDeltaStoreConfig);
		case PlatformType.STUB:
			return new StubDeltaStoreConfig(jsonDeltaStoreConfig);
		default:
			throw `Unsupported platform type ${platformType}`;
	}
}

export function getPlatformConfig(
	deltaStoreConfig: DeltaStoreConfig
): any {
	switch (deltaStoreConfig.setupInfo.platformType) {
		case PlatformType.GOOGLE_DOCS:
			return {
				rootFolder: this.setupInfo.rootFolder,
				apiKey: this.setupInfo.apiKey,
				clientId: this.setupInfo.clientId
			};
		default:
			return {};
	}
}