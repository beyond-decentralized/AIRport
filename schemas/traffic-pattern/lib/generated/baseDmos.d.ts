import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema } from './schema/qschema';
import { ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn } from './schema/qschemacolumn';
import { ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity } from './schema/qschemaentity';
import { ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty } from './schema/qschemaproperty';
import { ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference } from './schema/qschemareference';
import { ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation } from './schema/qschemarelation';
import { ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion } from './schema/qschemaversion';
export interface IBaseSchemaDmo extends IDmo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema> {
}
export declare class BaseSchemaDmo extends Dmo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema> implements IBaseSchemaDmo {
    constructor();
}
export interface IBaseSchemaColumnDmo extends IDmo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> {
}
export declare class BaseSchemaColumnDmo extends Dmo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> implements IBaseSchemaColumnDmo {
    constructor();
}
export interface IBaseSchemaEntityDmo extends IDmo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> {
}
export declare class BaseSchemaEntityDmo extends Dmo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> implements IBaseSchemaEntityDmo {
    constructor();
}
export interface IBaseSchemaPropertyDmo extends IDmo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> {
}
export declare class BaseSchemaPropertyDmo extends Dmo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> implements IBaseSchemaPropertyDmo {
    constructor();
}
export interface IBaseSchemaPropertyColumnDmo extends IDmo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> {
}
export declare class BaseSchemaPropertyColumnDmo extends Dmo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> implements IBaseSchemaPropertyColumnDmo {
    constructor();
}
export interface IBaseSchemaReferenceDmo extends IDmo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> {
}
export declare class BaseSchemaReferenceDmo extends Dmo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> implements IBaseSchemaReferenceDmo {
    constructor();
}
export interface IBaseSchemaRelationDmo extends IDmo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> {
}
export declare class BaseSchemaRelationDmo extends Dmo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> implements IBaseSchemaRelationDmo {
    constructor();
}
export interface IBaseSchemaRelationColumnDmo extends IDmo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> {
}
export declare class BaseSchemaRelationColumnDmo extends Dmo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> implements IBaseSchemaRelationColumnDmo {
    constructor();
}
export interface IBaseSchemaVersionDmo extends IDmo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> {
}
export declare class BaseSchemaVersionDmo extends Dmo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> implements IBaseSchemaVersionDmo {
    constructor();
}
