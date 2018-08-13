import {IAirportDatabase, IUtils, Utils} from "../../../../../apis/air-control/lib/index";
import { QueryType, StoreType }          from "../../../../../apis/ground-control/lib/index";
import { Database }                      from "sql.js";
import { SQLDialect }                    from "../../query/sql/core/SQLQuery";
import { SqLiteDriver }                  from "../sqLite/SqLiteDriver";
import { ActiveQueries }                 from "../ActiveQueries";

declare function require(moduleName: string): any;

/**
 * Created by Papa on 11/27/2016.
 */

declare var SQL;

export class SqlJsDriver extends SqLiteDriver {

	private _db: Database;

	private currentTransaction;

	constructor(
		airportDb: IAirportDatabase,
		utils: IUtils,
		queries: ActiveQueries
	) {
		super(airportDb, utils, queries);
		this.type = StoreType.SQLJS;
	}

	protected getDialect(): SQLDialect {
		return SQLDialect.SQLITE_SQLJS;
	}

	async initialize(): Promise<any> {
		if (typeof SQL !== "undefined") {
			this._db = new SQL.Database();
		} else {
			let sql = require('sql.js');
			this._db = new sql.Database();
		}
		return await this.initAllTables();
	}

	async startTransaction(): Promise<void> {
		this._db.exec("BEGIN TRANSACTION;");
		this.currentTransaction = true;
	}

	async commitTransaction(): Promise<void> {
		try {
			this._db.exec("COMMIT;");
		} finally {
			this.currentTransaction = false;
		}
	}

	async rollbackTransaction(): Promise<void> {
		try {
			this._db.exec("ROLLBACK;");
		} finally {
			this.currentTransaction = false;
		}
	}

	async query(
		queryType: QueryType,
		query: string,
		params = [],
		saveTransaction: boolean = false
	): Promise<any> {
		return new Promise<any>((
			resolve,
			reject
		) => {
			let stmt;
			try {
				if (!['TQ_BOOLEAN_FIELD_CHANGE', 'TQ_DATE_FIELD_CHANGE', 'TQ_NUMBER_FIELD_CHANGE', 'TQ_STRING_FIELD_CHANGE',
						'TQ_ENTITY_CHANGE', 'TQ_ENTITY_WHERE_CHANGE', 'TQ_TRANSACTION'].some((deltaTableName) => {
						return query.indexOf(deltaTableName) > -1
					})) {
					console.log(query);
					console.log(params);
				}
				stmt = this._db.prepare(query);
				stmt.bind(params);

				let results = [];
				while (stmt.step()) {
					results.push(stmt.get());
				}
				resolve(results);
			} catch (error) {
				reject(error);
			} finally {
				if (stmt) {
					stmt.free();
				}
			}
		});
	}

	private getReturnValue(
		queryType: QueryType,
		response
	): any {
		switch (queryType) {
			case QueryType.MUTATE:
				return response.rowsAffected;
			case QueryType.SELECT:
				return response.rows;
			default:
				return null;
		}
	}

	handleError(error: any) {
		throw error;
	}

}