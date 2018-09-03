import {
	AirportDatabaseToken,
	IAirportDatabase,
	IUtils,
	QRelation,
	QSchema,
	QSchemaInternal,
	setQSchemaEntities,
	UtilsToken
}                                     from '@airport/air-control'
import {
	DbSchemaUtilsToken,
	IDbSchemaUtils
}                                     from '@airport/ground-control'
import {ISchema}                      from '@airport/traffic-pattern'
import {
	Container,
	Inject,
	Service
} from 'typedi'
import {QueryEntityClassCreatorToken} from './InjectionTokens'

// https://github.com/russoturisto/tarmaq/blob/master/src/generated/data/schema/qRepositorySchema.ts

export interface IQueryEntityClassCreator {

	create(
		schema: ISchema
	): QSchema;

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

	create(
		schema: ISchema
	): QSchema {
		const dbSchema               = <any>schema
		let qSchema: QSchemaInternal = this.airportDatabase.qSchemaMapByName[schema.name]
		// If the Schema API source has already been loaded
		if (qSchema) {
			qSchema.__dbSchema__              = dbSchema
			qSchema.__injected__.__dbSchema__ = dbSchema
			setQSchemaEntities(dbSchema, qSchema.__injected__)
		} else {
			qSchema                                            = {
				__constructors__: {},
				__qConstructors__: {},
				__dbSchema__: dbSchema
			}
			this.airportDatabase.qSchemaMapByName[schema.name] = qSchema
		}
		this.airportDatabase.qSchemas[schema.index] = qSchema
		setQSchemaEntities(dbSchema, qSchema)

		return qSchema
	}

	getQEntityQRelation(): typeof QRelation {
		return null
	}


}