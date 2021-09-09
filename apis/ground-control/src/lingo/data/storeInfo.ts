export enum StoreType {
	COCKROACHDB,
	MYSQL,
	POSTGRESQL,
	REMOTE,
	SQLITE,
	SQLJS,
	WEB_SQL,
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
