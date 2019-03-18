import { IBaseSchemaColumnDmo, IBaseSchemaDmo, IBaseSchemaEntityDmo, IBaseSchemaPropertyColumnDmo, IBaseSchemaPropertyDmo, IBaseSchemaReferenceDmo, IBaseSchemaRelationColumnDmo, IBaseSchemaRelationDmo, IBaseSchemaVersionDmo, IBaseVersionedSchemaObjectDmo } from '../generated/generated';
export * from './SchemaVersionDmo';
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
