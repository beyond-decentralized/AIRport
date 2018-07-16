/**
 * Created by Papa on 12/15/2016.
 */
import {DatabaseIndex} from "@airport/ground-control";


export namespace deltaConst {
	export const DB_ID_FIELD = 'createDbId';
}

export namespace dbConst {
	export const CURRENT_DB    = undefined;
	export const DEFAULT_DB    = 'tq-default_db';
	export const ALL_DBS       = 'tq-all_dbs';
	export const OWN_DB_FACADE = 'tq-own_db_facade';
}

export function getDbIndex(
	dbName: string
): DatabaseIndex {
	if (dbName === dbConst.CURRENT_DB) {
		return -1;
	}
	throw `Not implemented`;
}
