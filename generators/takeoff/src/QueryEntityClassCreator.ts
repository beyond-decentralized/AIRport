import {
	AIR_DB,
	IAirportDatabase,
	IUtils,
	orderSchemasInOrderOfPrecedence,
	QSchema,
	QSchemaInternal,
	setQSchemaEntities,
	UTILS
}                                   from '@airport/air-control'
import {DI}                         from '@airport/di'
import {
	DB_SCHEMA_UTILS,
	DbSchema,
	IDbSchemaUtils
}                                   from '@airport/ground-control'
import {ISchema}                    from '@airport/traffic-pattern'
import {QUERY_ENTITY_CLASS_CREATOR} from './diTokens'

// https://github.com/russoturisto/tarmaq/blob/master/src/generated/data/schema/qRepositorySchema.ts

export interface IQueryEntityClassCreator {

	createAll(
		schemas: ISchema[]
	): void

}

export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	private airDb: IAirportDatabase
	private utils: IUtils
	private dbSchemaUtils: IDbSchemaUtils

	constructor() {
		DI.get((
			airportDatabase,
			utils,
			dbSchemaUtils
		) => {
			this.airDb         = airportDatabase
			this.utils         = utils
			this.dbSchemaUtils = dbSchemaUtils
		}, AIR_DB, UTILS, DB_SCHEMA_UTILS)
	}

	createAll(
		schemas: ISchema[]
	): void {
		const schemasToCreate = orderSchemasInOrderOfPrecedence(<any>schemas)
		schemasToCreate.map(
			dbSchema => this.create(dbSchema))
	}

	create(
		dbSchema: DbSchema
	): QSchema {
		let qSchema: QSchemaInternal = this.airDb.qSchemaMapByName[dbSchema.name]
		// If the Schema API source has already been loaded
		if (qSchema) {
			qSchema.__dbSchema__              = dbSchema
			qSchema.__injected__.__dbSchema__ = dbSchema
			setQSchemaEntities(dbSchema, qSchema.__injected__, this.airDb.qSchemas)
		} else {
			qSchema                                    = {
				__constructors__: {},
				__qConstructors__: {},
				__dbSchema__: dbSchema
			}
			this.airDb.qSchemaMapByName[dbSchema.name] = qSchema
		}
		this.airDb.qSchemas[dbSchema.index] = qSchema
		setQSchemaEntities(dbSchema, qSchema, this.airDb.qSchemas)

		return qSchema
	}

}

DI.set(QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator)
