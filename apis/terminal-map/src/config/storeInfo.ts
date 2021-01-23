import { StoreType } from '@airport/ground-control';

export interface StoreShareInfo {
	name: string;
}

export interface StoreSetupInfo {
	name: string;
	type: StoreType;
	idGeneration: IdGeneration;
}

export enum IdGeneration {
	ENTITY_CHANGE_ID,
}

export namespace store.type {
	export const WEB_SQL = 'WEB_SQL'
	export const SQL_JS  = 'SQL_JS'

	export function getName(
		localStoreType: StoreType
	): string {
		switch (localStoreType) {
			case StoreType.SQLITE_CORDOVA:
				return WEB_SQL
			case StoreType.SQLJS:
				return SQL_JS
			default:
				throw new Error(
					`Unsupported Local Store Type: ${localStoreType}`)
		}
	}

	export function getValue(
		localStoreTypeName: string
	): StoreType {
		switch (localStoreTypeName) {
			case WEB_SQL:
				return StoreType.SQLITE_CORDOVA
			case SQL_JS:
				return StoreType.SQLJS
			default:
				throw new Error(
					`Unsupported Local Store Type name: ${localStoreTypeName}`)
		}
	}

}
