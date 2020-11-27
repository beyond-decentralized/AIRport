export enum StoreType {
	COCKROACHDB,
	MYSQL,
	POSTGRESQL,
	REMOTE,
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
