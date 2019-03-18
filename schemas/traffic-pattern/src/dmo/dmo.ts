import {DI}                                       from '@airport/di'
import {
	IBaseSchemaColumnDmo,
	IBaseSchemaDmo,
	IBaseSchemaEntityDmo,
	IBaseSchemaPropertyColumnDmo,
	IBaseSchemaPropertyDmo,
	IBaseSchemaReferenceDmo,
	IBaseSchemaRelationColumnDmo,
	IBaseSchemaRelationDmo,
	IBaseSchemaVersionDmo,
	IBaseVersionedSchemaObjectDmo
}                                                 from '../generated/generated'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DMOS} from '../diTokens'

export * from './SchemaVersionDmo'

export interface NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos {

	Schema: IBaseSchemaDmo;
	SchemaColumn: IBaseSchemaColumnDmo;
	SchemaEntity: IBaseSchemaEntityDmo;
	SchemaProperty: IBaseSchemaPropertyDmo;
	SchemaPropertyColumn: IBaseSchemaPropertyColumnDmo;
	SchemaReference: IBaseSchemaReferenceDmo;
	SchemaRelation: IBaseSchemaRelationDmo;
	SchemaRelationColumn: IBaseSchemaRelationColumnDmo;
	SchemaVersion: IBaseSchemaVersionDmo;
	VersionedSchemaObject: IBaseVersionedSchemaObjectDmo;

}

class AtAirport_TrafficPattern_Dmos
	implements NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos {

	Schema: IBaseSchemaDmo
	SchemaColumn: IBaseSchemaColumnDmo
	SchemaEntity: IBaseSchemaEntityDmo
	SchemaProperty: IBaseSchemaPropertyDmo
	SchemaPropertyColumn: IBaseSchemaPropertyColumnDmo
	SchemaReference: IBaseSchemaReferenceDmo
	SchemaRelation: IBaseSchemaRelationDmo
	SchemaRelationColumn: IBaseSchemaRelationColumnDmo
	SchemaVersion: IBaseSchemaVersionDmo
	VersionedSchemaObject: IBaseVersionedSchemaObjectDmo

}

DI.set(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DMOS, AtAirport_TrafficPattern_Dmos)
