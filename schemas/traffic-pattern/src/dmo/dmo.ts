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
	AtAirport_TrafficPattern_DaosToken,
	AtAirport_TrafficPattern_DmosToken
}                from '../InjectionTokens'

export * from './SchemaVersionDmo'

export interface IAtAirport_TrafficPattern_Dmos {

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

@Service(AtAirport_TrafficPattern_DmosToken)
class AtAirport_TrafficPattern_Dmos
	implements IAtAirport_TrafficPattern_Dmos {

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