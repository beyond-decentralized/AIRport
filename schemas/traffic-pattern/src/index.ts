import {
	AIRPORT_DATABASE,
	IAirportDatabase,
	QSchemaInternal,
	setQSchemaEntities
}                                                 from '@airport/air-control'
import {DI}                                       from '@airport/di'
import {
	DB_SCHEMA_UTILS,
	DbSchema,
	IDbSchemaUtils,
}                                                 from '@airport/ground-control'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos} from './dao/dao'
import {
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DAOS,
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DMOS,
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA
}                                                 from './diTokens'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos} from './dmo/dmo'
import {
	LocalQSchema,
	Q_SCHEMA
}                                                 from './generated/qSchema'
import {SCHEMA}                                   from './generated/schema'
import {QSchema}                                  from './generated/schema/qschema'
import {QSchemaColumn}                            from './generated/schema/qschemacolumn'
import {QSchemaEntity}                            from './generated/schema/qschemaentity'
import {QSchemaProperty}                          from './generated/schema/qschemaproperty'
import {QSchemaPropertyColumn}                    from './generated/schema/qschemapropertycolumn'
import {QSchemaReference}                         from './generated/schema/qschemareference'
import {QSchemaRelation}                          from './generated/schema/qschemarelation'
import {QSchemaRelationColumn}                    from './generated/schema/qschemarelationcolumn'
import {QSchemaVersion}                           from './generated/schema/qschemaversion'
import {QVersionedSchemaObject}                   from './generated/schema/qversionedschemaobject'

export * from './dao/dao'
export * from './ddl/ddl'
export * from './generated/generated'
export * from './diTokens'

export interface NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSchema
	extends LocalQSchema {

}

export class AtAirport_TrafficPattern_QSchema
	implements NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSchema,
	           QSchemaInternal {

	db: DbSchema
	__constructors__
	__created__
	__exported__
	__injected__

	Schema: QSchema
	SchemaColumn: QSchemaColumn
	SchemaEntity: QSchemaEntity
	SchemaProperty: QSchemaProperty
	SchemaPropertyColumn: QSchemaPropertyColumn
	SchemaReference: QSchemaReference
	SchemaRelation: QSchemaRelation
	SchemaRelationColumn: QSchemaRelationColumn
	SchemaVersion: QSchemaVersion
	VersionedSchemaObject: QVersionedSchemaObject

	public dao: NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos
	public dmo: NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos

	constructor() {
		DI.get((
			airDb,
			dao,
			dbSchemaUtils,
			dmo
			) => {
				this.dao = dao
				this.dmo = dmo
				this.init(airDb, dbSchemaUtils)
			}, AIRPORT_DATABASE,
			NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DAOS,
			DB_SCHEMA_UTILS,
			NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DMOS
		)

	}

	private init(
		airDb: IAirportDatabase,
		dbSchemaUtils: IDbSchemaUtils
	): void {
		const schemaName = dbSchemaUtils.getSchemaName(SCHEMA)

		this.__constructors__ = Q_SCHEMA.__constructors
		Q_SCHEMA.dao          = this.dao
		Q_SCHEMA.dmo          = this.dmo
		Q_SCHEMA.__exported__ = Q_SCHEMA
		Q_SCHEMA.__injected__ = this
		this.__injected__     = this
		this.__exported__     = Q_SCHEMA

		const existingQSchema = airDb.qSchemaMapByName[schemaName]
		// If '@airport/takeoff' has already run
		if (existingQSchema) {
			Q_SCHEMA.__created__         = existingQSchema
			this.__created__             = existingQSchema
			existingQSchema.__injected__ = this
			existingQSchema.__exported__ = Q_SCHEMA
			existingQSchema.__created__  = existingQSchema

			existingQSchema.dao              = this.dao
			existingQSchema.dmo              = this.dmo
			existingQSchema.__constructors__ = Q_SCHEMA.__constructors
			setQSchemaEntities(existingQSchema.__dbSchema__, this, airDb.qSchemas)
			setQSchemaEntities(existingQSchema.__dbSchema__, Q_SCHEMA, airDb.qSchemas)
		} else {
			Q_SCHEMA.__created__                         = Q_SCHEMA
			this.__created__                             = Q_SCHEMA
			airDb.qSchemaMapByName[schemaName] = Q_SCHEMA
		}
	}

}

DI.set(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA, AtAirport_TrafficPattern_QSchema)
