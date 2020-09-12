export enum StoreType {
	REMOTE,
	MYSQL,
	SQLITE_CORDOVA,
	SQLJS,
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
