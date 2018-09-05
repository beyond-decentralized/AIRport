import {
	AirportDatabaseToken,
	IAirportDatabase,
	IUtils,
	orderSchemasInOrderOfPrecedence,
	QSchema,
	QSchemaInternal,
	setQSchemaEntities,
	UtilsToken
}                                     from '@airport/air-control'
import {
	DbSchema,
	DbSchemaUtilsToken,
	IDbSchemaUtils
}                                     from '@airport/ground-control'
import {ISchema}                      from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                                     from 'typedi'
import {QueryEntityClassCreatorToken} from './InjectionTokens'

// https://github.com/russoturisto/tarmaq/blob/master/src/generated/data/schema/qRepositorySchema.ts

export interface IQueryEntityClassCreator {

	createAll(
		schemas: ISchema[]
	): void

}

@Service(QueryEntityClassCreatorToken)
export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDatabase: IAirportDatabase,
		@Inject(UtilsToken)
		private utils: IUtils,
		@Inject(DbSchemaUtilsToken)
		private dbSchemaUtils: IDbSchemaUtils
	) {
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
		let qSchema: QSchemaInternal = this.airportDatabase.qSchemaMapByName[dbSchema.name]
		// If the Schema API source has already been loaded
		if (qSchema) {
			qSchema.__dbSchema__              = dbSchema
			qSchema.__injected__.__dbSchema__ = dbSchema
			setQSchemaEntities(dbSchema, qSchema.__injected__, this.airportDatabase.qSchemas)
		} else {
			qSchema                                              = {
				__constructors__: {},
				__qConstructors__: {},
				__dbSchema__: dbSchema
			}
			this.airportDatabase.qSchemaMapByName[dbSchema.name] = qSchema
		}
		this.airportDatabase.qSchemas[dbSchema.index] = qSchema
		setQSchemaEntities(dbSchema, qSchema, this.airportDatabase.qSchemas)

		return qSchema
	}

}