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
	IBaseSchemaVersionDuo
}                                                 from '../generated/generated'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DUOS} from '../tokens'

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

}

DI.set(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DUOS, AtAirport_TrafficPattern_Duos)
