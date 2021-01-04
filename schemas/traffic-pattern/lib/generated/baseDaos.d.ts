import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
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
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSchemaDao extends IDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema> {
}
export declare class BaseSchemaDao extends SQDIDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema> implements IBaseSchemaDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaColumnDao extends IDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn> {
}
export declare class BaseSchemaColumnDao extends SQDIDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn> implements IBaseSchemaColumnDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaEntityDao extends IDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity> {
}
export declare class BaseSchemaEntityDao extends SQDIDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity> implements IBaseSchemaEntityDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaOperationDao extends IDao<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation> {
}
export declare class BaseSchemaOperationDao extends SQDIDao<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation> implements IBaseSchemaOperationDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyDao extends IDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty> {
}
export declare class BaseSchemaPropertyDao extends SQDIDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty> implements IBaseSchemaPropertyDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyColumnDao extends IDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn> {
}
export declare class BaseSchemaPropertyColumnDao extends SQDIDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn> implements IBaseSchemaPropertyColumnDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaReferenceDao extends IDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference> {
}
export declare class BaseSchemaReferenceDao extends SQDIDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference> implements IBaseSchemaReferenceDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationDao extends IDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation> {
}
export declare class BaseSchemaRelationDao extends SQDIDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation> implements IBaseSchemaRelationDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationColumnDao extends IDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn> {
}
export declare class BaseSchemaRelationColumnDao extends SQDIDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn> implements IBaseSchemaRelationColumnDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaVersionDao extends IDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion> {
}
export declare class BaseSchemaVersionDao extends SQDIDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion> implements IBaseSchemaVersionDao {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map