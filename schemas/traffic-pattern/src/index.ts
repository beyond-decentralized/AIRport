import {
	AirportDatabaseToken,
	IAirportDatabase,
	QSchemaInternal,
	setQSchemaEntities
}                                                 from '@airport/air-control'
import {
	DbSchema,
	DbSchemaUtilsToken,
	IDbSchemaUtils,
}                                                 from '@airport/ground-control'
import {
	Inject,
	Service
}                                                 from 'typedi'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos} from './dao/dao'
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
import {
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DaosToken,
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DmosToken,
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSchemaToken
}                                                 from './InjectionTokens'

export * from './dao/dao'
export * from './ddl/ddl'
export * from './generated/generated'
export * from './InjectionTokens'

export interface NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSchema
	extends LocalQSchema {

}

@Service(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSchemaToken)
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

	constructor(
		@Inject(AirportDatabaseToken)
		airportDatabase: IAirportDatabase,
		@Inject(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DaosToken)
		public dao: NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos,
		@Inject(DbSchemaUtilsToken)
		dbSchemaUtils: IDbSchemaUtils,
		@Inject(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DmosToken)
		public dmo: NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos,
	) {
		const schemaName = dbSchemaUtils.getSchemaName(SCHEMA)

		this.__constructors__ = Q_SCHEMA.__constructors
		Q_SCHEMA.dao          = dao
		Q_SCHEMA.dmo          = dmo
		Q_SCHEMA.__exported__ = Q_SCHEMA
		Q_SCHEMA.__injected__ = this
		this.__injected__     = this
		this.__exported__     = Q_SCHEMA

		const existingQSchema = airportDatabase.qSchemaMapByName[schemaName]
		// If '@airport/takeoff' has already run
		if (existingQSchema) {
			Q_SCHEMA.__created__         = existingQSchema
			this.__created__             = existingQSchema
			existingQSchema.__injected__ = this
			existingQSchema.__exported__ = Q_SCHEMA
			existingQSchema.__created__  = existingQSchema

			existingQSchema.dao              = dao
			existingQSchema.dmo              = dao
			existingQSchema.__constructors__ = Q_SCHEMA.__constructors
			setQSchemaEntities(existingQSchema.__dbSchema__, this, airportDatabase.qSchemas)
			setQSchemaEntities(existingQSchema.__dbSchema__, Q_SCHEMA, airportDatabase.qSchemas)
		} else {
			Q_SCHEMA.__created__                         = Q_SCHEMA
			this.__created__                             = Q_SCHEMA
			airportDatabase.qSchemaMapByName[schemaName] = Q_SCHEMA
		}
	}

}
