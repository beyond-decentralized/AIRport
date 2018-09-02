import {
	AirportDatabaseToken,
	IAirportDatabase,
	IUtils,
	QRelation,
	QSchema,
	QSchemaInternal,
	setQSchemaEntities,
	UtilsToken
} from '@airport/air-control'
import {ISchema}                      from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                                     from 'typedi'
import {QueryEntityClassCreatorToken} from './InjectionTokens'

//https://github.com/russoturisto/tarmaq/blob/master/src/generated/data/schema/qRepositorySchema.ts

export interface IQueryEntityClassCreator {

	create(
		schema: ISchema
	): QSchema;

}

@Service(QueryEntityClassCreatorToken)
export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	constructor(
		@Inject(UtilsToken)
		private utils: IUtils,
		@Inject(AirportDatabaseToken)
		private airportDatabase: IAirportDatabase
	) {
	}

	create(
		schema: ISchema
	): QSchema {
		let qSchema: QSchemaInternal;

		if(this.airportDatabase.qSchemaMapByName[schema.name]){

		} else {

		}

		qSchema: QSchemaInternal = {
			__constructors__: {},
			__qConstructors__: {},
			__dbSchema__: <any>schema
		}

		setQSchemaEntities(schema, qSchema)

		return qSchema
	}

	getQEntityQRelation(): typeof QRelation {
		return null
	}


}