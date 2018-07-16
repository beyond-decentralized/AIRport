export enum StoreType {
	SQLITE_CORDOVA,
	SQLJS,
	REMOTE
}

export interface StoreShareInfo {
	name: string;
}

export interface StoreSetupInfo {
	name: string;
	type: StoreType;
	idGeneration: IdGeneration;
}

export enum IdGeneration {
	ENTITY_CHANGE_ID
}