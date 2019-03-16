import { DbColumn, DbEntity, DbProperty, DbSchema, SchemaIndex, TableIndex } from '@airport/ground-control';
import { QSchema } from '../../lingo/AirportDatabase';
import { IQEntityInternal } from '../../lingo/core/entity/Entity';
import { IQBooleanField } from '../../lingo/core/field/BooleanField';
import { IQDateField } from '../../lingo/core/field/DateField';
import { IQNumberField } from '../../lingo/core/field/NumberField';
import { IQStringField } from '../../lingo/core/field/StringField';
import { IQUntypedField } from '../../lingo/core/field/UntypedField';
import { IUtils } from '../../lingo/utils/Utils';
import { QEntity } from '../core/entity/Entity';
import { QRelation } from '../core/entity/Relation';
/**
 * From:
 * http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
 * Via:
 * https://stackoverflow.com/questions/6617780/how-to-call-parent-constructor
 */
export declare function extend(base: any, sub: any, methods: any): any;
export declare function getColumnQField(entity: DbEntity, property: DbProperty, q: IQEntityInternal, utils: IUtils, column?: DbColumn): IQUntypedField | IQBooleanField | IQDateField | IQNumberField | IQStringField;
export declare function getQRelation(entity: DbEntity, property: DbProperty, q: IQEntityInternal, utils: IUtils, allQSchemas: QSchema[]): QRelation<typeof q>;
export declare function getQEntityConstructor(allQSchemas: QSchema[]): typeof QEntity;
export declare function getQEntityIdRelationConstructor(): typeof QRelation;
export declare function getQEntityIdFields(addToObject: any, entity: DbEntity, utils: IUtils, parentProperty?: DbProperty, relationColumnMap?: Map<DbColumn, DbColumn>): void;
export declare function setQSchemaEntities(schema: DbSchema, qSchema: QSchema, allQSchemas: QSchema[]): void;
export interface DbSchemaWithDependencies {
    schema: DbSchema;
    dependencies: Set<SchemaIndex>;
}
export declare function orderSchemasInOrderOfPrecedence(schemas: DbSchema[]): DbSchema[];
export declare function schemaDependsOn(dependantSchema: DbSchemaWithDependencies, dependsOnSchemaIndex: SchemaIndex, schemaWithDepsMap: Map<SchemaIndex, DbSchemaWithDependencies>): boolean;
export declare function orderEntitiesByIdDependencies(entities: DbEntity[]): DbEntity[];
export declare function entityDependsOn(dependantEntity: DbEntityWithDependencies, dependsOnEntityIndex: TableIndex, entityWithDepsMap: Map<TableIndex, DbEntityWithDependencies>): boolean;
export interface DbEntityWithDependencies {
    entity: DbEntity;
    dependencies: Set<TableIndex>;
}
