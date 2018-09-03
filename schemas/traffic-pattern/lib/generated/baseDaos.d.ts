import { IDao, IUtils } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, QSchema } from './schema/qschema';
import { ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn } from './schema/qschemacolumn';
import { ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity } from './schema/qschemaentity';
import { ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty } from './schema/qschemaproperty';
import { ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference } from './schema/qschemareference';
import { ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation } from './schema/qschemarelation';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion } from './schema/qschemaversion';
import { ITestA, TestAESelect, TestAECreateProperties, TestAEUpdateColumns, TestAEUpdateProperties, TestAEId, QTestA } from './test/qtesta';
import { ITestB, TestBESelect, TestBECreateProperties, TestBEUpdateColumns, TestBEUpdateProperties, TestBEId, QTestB } from './test/qtestb';
import { ITestC, TestCESelect, TestCECreateProperties, TestCEUpdateColumns, TestCEUpdateProperties, TestCEId, QTestC } from './test/qtestc';
import { IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject } from './schema/qversionedschemaobject';
export interface IBaseSchemaDao extends IDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, QSchema> {
}
export declare class BaseSchemaDao extends Dao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, QSchema> implements IBaseSchemaDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaColumnDao extends IDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> {
}
export declare class BaseSchemaColumnDao extends Dao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> implements IBaseSchemaColumnDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaEntityDao extends IDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> {
}
export declare class BaseSchemaEntityDao extends Dao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> implements IBaseSchemaEntityDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaPropertyDao extends IDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> {
}
export declare class BaseSchemaPropertyDao extends Dao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> implements IBaseSchemaPropertyDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaPropertyColumnDao extends IDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> {
}
export declare class BaseSchemaPropertyColumnDao extends Dao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> implements IBaseSchemaPropertyColumnDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaReferenceDao extends IDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> {
}
export declare class BaseSchemaReferenceDao extends Dao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> implements IBaseSchemaReferenceDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaRelationDao extends IDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> {
}
export declare class BaseSchemaRelationDao extends Dao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> implements IBaseSchemaRelationDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaRelationColumnDao extends IDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> {
}
export declare class BaseSchemaRelationColumnDao extends Dao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> implements IBaseSchemaRelationColumnDao {
    constructor(utils: IUtils);
}
export interface IBaseSchemaVersionDao extends IDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> {
}
export declare class BaseSchemaVersionDao extends Dao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> implements IBaseSchemaVersionDao {
    constructor(utils: IUtils);
}
export interface IBaseTestADao extends IDao<ITestA, TestAESelect, TestAECreateProperties, TestAEUpdateColumns, TestAEUpdateProperties, TestAEId, QTestA> {
}
export declare class BaseTestADao extends Dao<ITestA, TestAESelect, TestAECreateProperties, TestAEUpdateColumns, TestAEUpdateProperties, TestAEId, QTestA> implements IBaseTestADao {
    constructor(utils: IUtils);
}
export interface IBaseTestBDao extends IDao<ITestB, TestBESelect, TestBECreateProperties, TestBEUpdateColumns, TestBEUpdateProperties, TestBEId, QTestB> {
}
export declare class BaseTestBDao extends Dao<ITestB, TestBESelect, TestBECreateProperties, TestBEUpdateColumns, TestBEUpdateProperties, TestBEId, QTestB> implements IBaseTestBDao {
    constructor(utils: IUtils);
}
export interface IBaseTestCDao extends IDao<ITestC, TestCESelect, TestCECreateProperties, TestCEUpdateColumns, TestCEUpdateProperties, TestCEId, QTestC> {
}
export declare class BaseTestCDao extends Dao<ITestC, TestCESelect, TestCECreateProperties, TestCEUpdateColumns, TestCEUpdateProperties, TestCEId, QTestC> implements IBaseTestCDao {
    constructor(utils: IUtils);
}
export interface IBaseVersionedSchemaObjectDao extends IDao<IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject> {
}
export declare class BaseVersionedSchemaObjectDao extends Dao<IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateColumns, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject> implements IBaseVersionedSchemaObjectDao {
    constructor(utils: IUtils);
}
