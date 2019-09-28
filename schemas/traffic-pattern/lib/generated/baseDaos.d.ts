import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { ISchema } from './schema/schema';
import { SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaECascadeGraph, QSchema } from './schema/qschema';
import { ISchemaColumn } from './schema/schemacolumn';
import { SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnECascadeGraph, QSchemaColumn } from './schema/qschemacolumn';
import { ISchemaEntity } from './schema/schemaentity';
import { SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityECascadeGraph, QSchemaEntity } from './schema/qschemaentity';
import { ISchemaProperty } from './schema/schemaproperty';
import { SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyECascadeGraph, QSchemaProperty } from './schema/qschemaproperty';
import { ISchemaPropertyColumn } from './schema/schemapropertycolumn';
import { SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnECascadeGraph, QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { ISchemaReference } from './schema/schemareference';
import { SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceECascadeGraph, QSchemaReference } from './schema/qschemareference';
import { ISchemaRelation } from './schema/schemarelation';
import { SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationECascadeGraph, QSchemaRelation } from './schema/qschemarelation';
import { ISchemaRelationColumn } from './schema/schemarelationcolumn';
import { SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnECascadeGraph, QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { ISchemaVersion } from './schema/schemaversion';
import { SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionECascadeGraph, QSchemaVersion } from './schema/qschemaversion';
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
