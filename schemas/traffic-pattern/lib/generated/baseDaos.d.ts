import { ISchema } from './schema/schema';
import { SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema } from './schema/qschema';
import { ISchemaColumn } from './schema/schemacolumn';
import { SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn } from './schema/qschemacolumn';
import { ISchemaCurrentVersion } from './schema/schemacurrentversion';
import { SchemaCurrentVersionESelect, SchemaCurrentVersionECreateProperties, SchemaCurrentVersionEUpdateColumns, SchemaCurrentVersionEUpdateProperties, SchemaCurrentVersionEId, SchemaCurrentVersionGraph, QSchemaCurrentVersion } from './schema/qschemacurrentversion';
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
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSchemaDao extends IDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema> {
}
export declare class BaseSchemaDao extends SQDIDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema> implements IBaseSchemaDao {
    static Find: DaoQueryDecorators<SchemaESelect>;
    static FindOne: DaoQueryDecorators<SchemaESelect>;
    static Search: DaoQueryDecorators<SchemaESelect>;
    static SearchOne: DaoQueryDecorators<SchemaESelect>;
    static Save(config: SchemaGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaColumnDao extends IDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn> {
}
export declare class BaseSchemaColumnDao extends SQDIDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn> implements IBaseSchemaColumnDao {
    static Find: DaoQueryDecorators<SchemaColumnESelect>;
    static FindOne: DaoQueryDecorators<SchemaColumnESelect>;
    static Search: DaoQueryDecorators<SchemaColumnESelect>;
    static SearchOne: DaoQueryDecorators<SchemaColumnESelect>;
    static Save(config: SchemaColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaCurrentVersionDao extends IDao<ISchemaCurrentVersion, SchemaCurrentVersionESelect, SchemaCurrentVersionECreateProperties, SchemaCurrentVersionEUpdateColumns, SchemaCurrentVersionEUpdateProperties, SchemaCurrentVersionEId, SchemaCurrentVersionGraph, QSchemaCurrentVersion> {
}
export declare class BaseSchemaCurrentVersionDao extends SQDIDao<ISchemaCurrentVersion, SchemaCurrentVersionESelect, SchemaCurrentVersionECreateProperties, SchemaCurrentVersionEUpdateColumns, SchemaCurrentVersionEUpdateProperties, SchemaCurrentVersionEId, SchemaCurrentVersionGraph, QSchemaCurrentVersion> implements IBaseSchemaCurrentVersionDao {
    static Find: DaoQueryDecorators<SchemaCurrentVersionESelect>;
    static FindOne: DaoQueryDecorators<SchemaCurrentVersionESelect>;
    static Search: DaoQueryDecorators<SchemaCurrentVersionESelect>;
    static SearchOne: DaoQueryDecorators<SchemaCurrentVersionESelect>;
    static Save(config: SchemaCurrentVersionGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaEntityDao extends IDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity> {
}
export declare class BaseSchemaEntityDao extends SQDIDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity> implements IBaseSchemaEntityDao {
    static Find: DaoQueryDecorators<SchemaEntityESelect>;
    static FindOne: DaoQueryDecorators<SchemaEntityESelect>;
    static Search: DaoQueryDecorators<SchemaEntityESelect>;
    static SearchOne: DaoQueryDecorators<SchemaEntityESelect>;
    static Save(config: SchemaEntityGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaOperationDao extends IDao<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation> {
}
export declare class BaseSchemaOperationDao extends SQDIDao<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation> implements IBaseSchemaOperationDao {
    static Find: DaoQueryDecorators<SchemaOperationESelect>;
    static FindOne: DaoQueryDecorators<SchemaOperationESelect>;
    static Search: DaoQueryDecorators<SchemaOperationESelect>;
    static SearchOne: DaoQueryDecorators<SchemaOperationESelect>;
    static Save(config: SchemaOperationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyDao extends IDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty> {
}
export declare class BaseSchemaPropertyDao extends SQDIDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty> implements IBaseSchemaPropertyDao {
    static Find: DaoQueryDecorators<SchemaPropertyESelect>;
    static FindOne: DaoQueryDecorators<SchemaPropertyESelect>;
    static Search: DaoQueryDecorators<SchemaPropertyESelect>;
    static SearchOne: DaoQueryDecorators<SchemaPropertyESelect>;
    static Save(config: SchemaPropertyGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaPropertyColumnDao extends IDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn> {
}
export declare class BaseSchemaPropertyColumnDao extends SQDIDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn> implements IBaseSchemaPropertyColumnDao {
    static Find: DaoQueryDecorators<SchemaPropertyColumnESelect>;
    static FindOne: DaoQueryDecorators<SchemaPropertyColumnESelect>;
    static Search: DaoQueryDecorators<SchemaPropertyColumnESelect>;
    static SearchOne: DaoQueryDecorators<SchemaPropertyColumnESelect>;
    static Save(config: SchemaPropertyColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaReferenceDao extends IDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference> {
}
export declare class BaseSchemaReferenceDao extends SQDIDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference> implements IBaseSchemaReferenceDao {
    static Find: DaoQueryDecorators<SchemaReferenceESelect>;
    static FindOne: DaoQueryDecorators<SchemaReferenceESelect>;
    static Search: DaoQueryDecorators<SchemaReferenceESelect>;
    static SearchOne: DaoQueryDecorators<SchemaReferenceESelect>;
    static Save(config: SchemaReferenceGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationDao extends IDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation> {
}
export declare class BaseSchemaRelationDao extends SQDIDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation> implements IBaseSchemaRelationDao {
    static Find: DaoQueryDecorators<SchemaRelationESelect>;
    static FindOne: DaoQueryDecorators<SchemaRelationESelect>;
    static Search: DaoQueryDecorators<SchemaRelationESelect>;
    static SearchOne: DaoQueryDecorators<SchemaRelationESelect>;
    static Save(config: SchemaRelationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaRelationColumnDao extends IDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn> {
}
export declare class BaseSchemaRelationColumnDao extends SQDIDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn> implements IBaseSchemaRelationColumnDao {
    static Find: DaoQueryDecorators<SchemaRelationColumnESelect>;
    static FindOne: DaoQueryDecorators<SchemaRelationColumnESelect>;
    static Search: DaoQueryDecorators<SchemaRelationColumnESelect>;
    static SearchOne: DaoQueryDecorators<SchemaRelationColumnESelect>;
    static Save(config: SchemaRelationColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSchemaVersionDao extends IDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion> {
}
export declare class BaseSchemaVersionDao extends SQDIDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion> implements IBaseSchemaVersionDao {
    static Find: DaoQueryDecorators<SchemaVersionESelect>;
    static FindOne: DaoQueryDecorators<SchemaVersionESelect>;
    static Search: DaoQueryDecorators<SchemaVersionESelect>;
    static SearchOne: DaoQueryDecorators<SchemaVersionESelect>;
    static Save(config: SchemaVersionGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map