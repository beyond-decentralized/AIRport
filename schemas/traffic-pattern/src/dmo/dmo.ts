import {Service} from 'typedi'
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
} from '..'
import {
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DaosToken,
	NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DmosToken
}                from '../InjectionTokens'

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

@Service(NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DmosToken)
class AtAirport_TrafficPattern_Dmos
	implements NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos {

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