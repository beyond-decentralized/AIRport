import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { ISchema, SchemaESelect, SchemaECascadeGraph, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, QSchema } from './schema/qschema';
import { ISchemaColumn, SchemaColumnESelect, SchemaColumnECascadeGraph, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn } from './schema/qschemacolumn';
import { ISchemaEntity, SchemaEntityESelect, SchemaEntityECascadeGraph, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity } from './schema/qschemaentity';
import { ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECascadeGraph, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty } from './schema/qschemaproperty';
import { ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECascadeGraph, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { ISchemaReference, SchemaReferenceESelect, SchemaReferenceECascadeGraph, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference } from './schema/qschemareference';
import { ISchemaRelation, SchemaRelationESelect, SchemaRelationECascadeGraph, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation } from './schema/qschemarelation';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECascadeGraph, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { ISchemaVersion, SchemaVersionESelect, SchemaVersionECascadeGraph, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion } from './schema/qschemaversion';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSchemaDao extends IDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaECascadeGraph, QSchema> {
}
export declare class BaseSchemaDao extends SQDIDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaECascadeGraph, QSchema> implements IBaseSchemaDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaColumnDao extends IDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnECascadeGraph, QSchemaColumn> {
}
export declare class BaseSchemaColumnDao extends SQDIDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnECascadeGraph, QSchemaColumn> implements IBaseSchemaColumnDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaEntityDao extends IDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityECascadeGraph, QSchemaEntity> {
}
export declare class BaseSchemaEntityDao extends SQDIDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityECascadeGraph, QSchemaEntity> implements IBaseSchemaEntityDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyDao extends IDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyECascadeGraph, QSchemaProperty> {
}
export declare class BaseSchemaPropertyDao extends SQDIDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyECascadeGraph, QSchemaProperty> implements IBaseSchemaPropertyDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyColumnDao extends IDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnECascadeGraph, QSchemaPropertyColumn> {
}
export declare class BaseSchemaPropertyColumnDao extends SQDIDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnECascadeGraph, QSchemaPropertyColumn> implements IBaseSchemaPropertyColumnDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaReferenceDao extends IDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceECascadeGraph, QSchemaReference> {
}
export declare class BaseSchemaReferenceDao extends SQDIDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceECascadeGraph, QSchemaReference> implements IBaseSchemaReferenceDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationDao extends IDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationECascadeGraph, QSchemaRelation> {
}
export declare class BaseSchemaRelationDao extends SQDIDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationECascadeGraph, QSchemaRelation> implements IBaseSchemaRelationDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationColumnDao extends IDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnECascadeGraph, QSchemaRelationColumn> {
}
export declare class BaseSchemaRelationColumnDao extends SQDIDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnECascadeGraph, QSchemaRelationColumn> implements IBaseSchemaRelationColumnDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaVersionDao extends IDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionECascadeGraph, QSchemaVersion> {
}
export declare class BaseSchemaVersionDao extends SQDIDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionECascadeGraph, QSchemaVersion> implements IBaseSchemaVersionDao {
    static diSet(): boolean;
    constructor();
}
