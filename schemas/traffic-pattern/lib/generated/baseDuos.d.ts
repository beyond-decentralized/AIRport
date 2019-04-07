import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema } from './schema/qschema';
import { ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn } from './schema/qschemacolumn';
import { ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity } from './schema/qschemaentity';
import { ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty } from './schema/qschemaproperty';
import { ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference } from './schema/qschemareference';
import { ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation } from './schema/qschemarelation';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion } from './schema/qschemaversion';
import { IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject } from './schema/qversionedschemaobject';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseSchemaDuo extends IDuo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema> {
}
export declare class BaseSchemaDuo extends SQDIDuo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema> implements IBaseSchemaDuo {
    constructor();
}
export interface IBaseSchemaColumnDuo extends IDuo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> {
}
export declare class BaseSchemaColumnDuo extends SQDIDuo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> implements IBaseSchemaColumnDuo {
    constructor();
}
export interface IBaseSchemaEntityDuo extends IDuo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> {
}
export declare class BaseSchemaEntityDuo extends SQDIDuo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> implements IBaseSchemaEntityDuo {
    constructor();
}
export interface IBaseSchemaPropertyDuo extends IDuo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> {
}
export declare class BaseSchemaPropertyDuo extends SQDIDuo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> implements IBaseSchemaPropertyDuo {
    constructor();
}
export interface IBaseSchemaPropertyColumnDuo extends IDuo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> {
}
export declare class BaseSchemaPropertyColumnDuo extends SQDIDuo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> implements IBaseSchemaPropertyColumnDuo {
    constructor();
}
export interface IBaseSchemaReferenceDuo extends IDuo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> {
}
export declare class BaseSchemaReferenceDuo extends SQDIDuo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> implements IBaseSchemaReferenceDuo {
    constructor();
}
export interface IBaseSchemaRelationDuo extends IDuo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> {
}
export declare class BaseSchemaRelationDuo extends SQDIDuo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> implements IBaseSchemaRelationDuo {
    constructor();
}
export interface IBaseSchemaRelationColumnDuo extends IDuo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> {
}
export declare class BaseSchemaRelationColumnDuo extends SQDIDuo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> implements IBaseSchemaRelationColumnDuo {
    constructor();
}
export interface IBaseSchemaVersionDuo extends IDuo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> {
}
export declare class BaseSchemaVersionDuo extends SQDIDuo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> implements IBaseSchemaVersionDuo {
    constructor();
}
export interface IBaseVersionedSchemaObjectDuo extends IDuo<IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject> {
}
export declare class BaseVersionedSchemaObjectDuo extends SQDIDuo<IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject> implements IBaseVersionedSchemaObjectDuo {
    constructor();
}
