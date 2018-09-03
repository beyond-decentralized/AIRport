import { IBaseSchemaColumnDao, IBaseSchemaDao, IBaseSchemaEntityDao, IBaseSchemaPropertyColumnDao, IBaseSchemaPropertyDao, IBaseSchemaReferenceDao, IBaseSchemaRelationColumnDao, IBaseSchemaRelationDao, IBaseSchemaVersionDao, IBaseVersionedSchemaObjectDao } from '../generated/generated';
export * from './SchemaColumnDao';
export * from './SchemaDao';
export * from './SchemaEntityDao';
export * from './SchemaPropertyColumnDao';
export * from './SchemaPropertyDao';
export * from './SchemaReferenceDao';
export * from './SchemaRelationColumnDao';
export * from './SchemaRelationDao';
export * from './SchemaVersionDao';
export interface NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos {
    Schema: IBaseSchemaDao;
    SchemaColumn: IBaseSchemaColumnDao;
    SchemaEntity: IBaseSchemaEntityDao;
    SchemaProperty: IBaseSchemaPropertyDao;
    SchemaPropertyColumn: IBaseSchemaPropertyColumnDao;
    SchemaReference: IBaseSchemaReferenceDao;
    SchemaRelation: IBaseSchemaRelationDao;
    SchemaRelationColumn: IBaseSchemaRelationColumnDao;
    SchemaVersion: IBaseSchemaVersionDao;
    VersionedSchemaObject: IBaseVersionedSchemaObjectDao;
}
