import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { ISchema } from './schema/schema';
import { SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema } from './schema/qschema';
import { ISchemaColumn } from './schema/schemacolumn';
import { SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn } from './schema/qschemacolumn';
import { ISchemaEntity } from './schema/schemaentity';
import { SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity } from './schema/qschemaentity';
import { ISchemaOperation } from './schema/schemaoperation';
import { SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation } from './schema/qschemaoperation';
import { ISchemaProperty } from './schema/schemaproperty';
import { SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty } from './schema/qschemaproperty';
import { ISchemaPropertyColumn } from './schema/schemapropertycolumn';
import { SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { ISchemaReference } from './schema/schemareference';
import { SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference } from './schema/qschemareference';
import { ISchemaRelation } from './schema/schemarelation';
import { SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation } from './schema/qschemarelation';
import { ISchemaRelationColumn } from './schema/schemarelationcolumn';
import { SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { ISchemaVersion } from './schema/schemaversion';
import { SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion } from './schema/qschemaversion';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSchemaDuo extends IDuo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema> {
}
export declare class BaseSchemaDuo extends SQDIDuo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema> implements IBaseSchemaDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaColumnDuo extends IDuo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn> {
}
export declare class BaseSchemaColumnDuo extends SQDIDuo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn> implements IBaseSchemaColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaEntityDuo extends IDuo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity> {
}
export declare class BaseSchemaEntityDuo extends SQDIDuo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity> implements IBaseSchemaEntityDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaOperationDuo extends IDuo<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation> {
}
export declare class BaseSchemaOperationDuo extends SQDIDuo<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation> implements IBaseSchemaOperationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyDuo extends IDuo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty> {
}
export declare class BaseSchemaPropertyDuo extends SQDIDuo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty> implements IBaseSchemaPropertyDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyColumnDuo extends IDuo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn> {
}
export declare class BaseSchemaPropertyColumnDuo extends SQDIDuo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn> implements IBaseSchemaPropertyColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaReferenceDuo extends IDuo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference> {
}
export declare class BaseSchemaReferenceDuo extends SQDIDuo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference> implements IBaseSchemaReferenceDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationDuo extends IDuo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation> {
}
export declare class BaseSchemaRelationDuo extends SQDIDuo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation> implements IBaseSchemaRelationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationColumnDuo extends IDuo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn> {
}
export declare class BaseSchemaRelationColumnDuo extends SQDIDuo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn> implements IBaseSchemaRelationColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaVersionDuo extends IDuo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion> {
}
export declare class BaseSchemaVersionDuo extends SQDIDuo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion> implements IBaseSchemaVersionDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map