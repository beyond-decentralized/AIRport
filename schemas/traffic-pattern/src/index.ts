import {
	AirportDatabaseToken,
	IAirportDatabase
}                                       from '@airport/air-control'
import {
	DbSchema,
	DbSchemaUtilsToken,
	IDbSchemaUtils,
}                                       from '@airport/ground-control'
import {
	Inject,
	Service
}                                       from 'typedi'
import {IAtAirport_TrafficPattern_Daos} from './dao/dao'
import {IAtAirport_TrafficPattern_Dmos} from './dmo/dmo'
import {LocalQSchema}                   from './generated/qSchema'
import {SCHEMA}                         from './generated/schema'
import {QSchema}                        from './generated/schema/qschema'
import {QSchemaColumn}                  from './generated/schema/qschemacolumn'
import {QSchemaEntity}                  from './generated/schema/qschemaentity'
import {QSchemaProperty}                from './generated/schema/qschemaproperty'
import {QSchemaPropertyColumn}          from './generated/schema/qschemapropertycolumn'
import {QSchemaReference}               from './generated/schema/qschemareference'
import {QSchemaRelation}                from './generated/schema/qschemarelation'
import {QSchemaRelationColumn}          from './generated/schema/qschemarelationcolumn'
import {QSchemaVersion}                 from './generated/schema/qschemaversion'
import {QVersionedSchemaObject}         from './generated/schema/qversionedschemaobject'
import {
	AtAirport_TrafficPattern_DaosToken,
	AtAirport_TrafficPattern_DmosToken,
	AtAirport_TrafficPattern_QSchemaToken
}                                       from './InjectionTokens'

export * from './dao/dao'
export * from './ddl/ddl'
export * from './generated/generated'
export * from './InjectionTokens'

export interface IAtAirport_TrafficPattern_QSchema
	extends LocalQSchema {

}

@Service(AtAirport_TrafficPattern_QSchemaToken)
export class AtAirport_TrafficPattern_QSchema
 implements IAtAirport_TrafficPattern_QSchema {

	db: DbSchema;

	Schema: QSchema;
	SchemaColumn: QSchemaColumn;
	SchemaEntity: QSchemaEntity;
	SchemaProperty: QSchemaProperty;
	SchemaPropertyColumn: QSchemaPropertyColumn;
	SchemaReference: QSchemaReference;
	SchemaRelation: QSchemaRelation;
	SchemaRelationColumn: QSchemaRelationColumn;
	SchemaVersion: QSchemaVersion;
	VersionedSchemaObject: QVersionedSchemaObject;

	constructor(
		@Inject(AtAirport_TrafficPattern_DaosToken)
		public dao: IAtAirport_TrafficPattern_Daos,
		@Inject(AtAirport_TrafficPattern_DmosToken)
		public dmo: IAtAirport_TrafficPattern_Dmos,
		@Inject(AirportDatabaseToken)
			airportDatabase: IAirportDatabase,
		@Inject(DbSchemaUtilsToken)
			dbSchemaUtils: IDbSchemaUtils
	) {
		const schemaName = dbSchemaUtils.getSchemaName(SCHEMA)

		const existingQSchema = airportDatabase.qSchemaMapByName[schemaName]
		if (existingQSchema) {
			existingQSchema.dao = dao
			existingQSchema.dmo = dao
		} else {
			airportDatabase.qSchemaMapByName[schemaName] = this
		}
	}
}
