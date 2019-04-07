import {DI}                                       from '@airport/di'
import {
	IBaseSchemaColumnDuo,
	IBaseSchemaDuo,
	IBaseSchemaEntityDuo,
	IBaseSchemaPropertyColumnDuo,
	IBaseSchemaPropertyDuo,
	IBaseSchemaReferenceDuo,
	IBaseSchemaRelationColumnDuo,
	IBaseSchemaRelationDuo,
	IBaseSchemaVersionDuo,
	IBaseVersionedSchemaObjectDuo
}                                                 from '../generated/generated'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DUOS} from '../diTokens'

export * from './SchemaVersionDuo'

export interface NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Duos {

	Schema: IBaseSchemaDuo;
	SchemaColumn: IBaseSchemaColumnDuo;
	SchemaEntity: IBaseSchemaEntityDuo;
	SchemaProperty: IBaseSchemaPropertyDuo;
	SchemaPropertyColumn: IBaseSchemaPropertyColumnDuo;
	SchemaReference: IBaseSchemaReferenceDuo;
	SchemaRelation: IBaseSchemaRelationDuo;
	SchemaRelationColumn: IBaseSchemaRelationColumnDuo;
	SchemaVersion: IBaseSchemaVersionDuo;
	VersionedSchemaObject: IBaseVersionedSchemaObjectDuo;

}

class AtAirport_TrafficPattern_Duos
	implements NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Duos {

	Schema: IBaseSchemaDuo
	SchemaColumn: IBaseSchemaColumnDuo
	SchemaEntity: IBaseSchemaEntityDuo
	SchemaProperty: IBaseSchemaPropertyDuo
	SchemaPropertyColumn: IBaseSchemaPropertyColumnDuo
	SchemaReference: IBaseSchemaReferenceDuo
	SchemaRelation: IBaseSchemaRelationDuo
	SchemaRelationColumn: IBaseSchemaRelationColumnDuo
	SchemaVersion: IBaseSchemaVersionDuo
	VersionedSchemaObject: IBaseVersionedSchemaObjectDuo

}

DI.set(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DUOS, AtAirport_TrafficPattern_Duos)
