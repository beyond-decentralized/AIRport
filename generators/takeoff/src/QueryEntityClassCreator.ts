import {
	IAirportDatabase,
	orderSchemasInOrderOfPrecedence,
	QSchema,
	QSchemaInternal,
	setQSchemaEntities
}                                   from '@airport/air-control'
import {DI}                         from '@airport/di'
import {DbSchema}                   from '@airport/ground-control'
import {ISchema}                    from '@airport/traffic-pattern'
import {QUERY_ENTITY_CLASS_CREATOR} from './diTokens'

// https://github.com/russoturisto/tarmaq/blob/master/src/generated/data/schema/qRepositorySchema.ts

export interface IQueryEntityClassCreator {

	createAll(
		schemas: ISchema[],
		airDb: IAirportDatabase
	): void

}

export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	createAll(
		schemas: ISchema[],
		airDb: IAirportDatabase
	): void {
		const schemasToCreate = orderSchemasInOrderOfPrecedence(<any>schemas)
		schemasToCreate.map(
			dbSchema => this.create(dbSchema, airDb))
	}

	create(
		dbSchema: DbSchema,
		airDb: IAirportDatabase
	): QSchema {
		let qSchema: QSchemaInternal = airDb.QM[dbSchema.name] as QSchemaInternal
		// If the Schema API source has already been loaded
		if (qSchema) {
			qSchema.__dbSchema__ = dbSchema
		} else {
			qSchema                 = {
				__constructors__: {},
				__qConstructors__: {},
				__dbSchema__: dbSchema,
				name: dbSchema.name,
				domain: dbSchema.domain.name
			}
			airDb.QM[dbSchema.name] = qSchema
		}
		airDb.Q[dbSchema.index] = qSchema
		setQSchemaEntities(dbSchema, qSchema, airDb.qSchemas)

		return qSchema
	}

}

DI.set(QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator)
