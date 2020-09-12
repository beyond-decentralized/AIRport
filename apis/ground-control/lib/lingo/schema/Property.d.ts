import { DatabaseForeignKey, DatabaseManyToOneElements, DatabaseObject, DatabaseOneToManyElements, DbSchemaVersion, EntityRelationType, JsonDatabaseObject, SQLDataType } from '../../index';
import { DbEntity, TableIndex } from './Entity';
import { SchemaIndex } from './Schema';
export declare type ColumnId = number;
export declare type ColumnIndex = number;
export declare type ColumnName = string;
export declare type ColumnNotNull = boolean;
export declare type PropertyId = number;
export declare type PropertyIndex = number;
export declare type PropertyIsId = boolean;
export declare type PropertyName = string;
export declare type RelationId = number;
export declare type RelationIndex = number;
export declare type SchemaColumnIsGenerated = boolean;
export declare type SchemaColumnAllocationSize = number;
/**
 * A property of an object in a schema.
 * Parent properties for the entity are indexed at each child table,
 * and are the first entries.
 */
export interface JsonSchemaProperty extends SchemaReferenceByIndex<PropertyIndex>, JsonDatabaseObject {
    /**
     * Does this property consist of @Id columns?
     */
    isId: PropertyIsId;
    /**
     * Name of the property.
     */
    name: PropertyName;
    /**
     * Column represented by the property.
     */
    columnRef?: SchemaReferenceByIndex<ColumnIndex>;
    /**
     * A Relation that is represented by the property (if any).
     */
    relationRef?: SchemaReferenceByIndex<RelationIndex>;
}
export interface DbProperty extends SchemaReferenceByIndex<PropertyIndex>, DatabaseObject {
    id: PropertyId;
    entity: DbEntity;
    name: PropertyName;
    isId: PropertyIsId;
    propertyColumns: DbPropertyColumn[];
    relation: DbRelation[];
}
export declare class DbPropertyColumn {
    column: DbColumn;
    property: DbProperty;
    sinceVersion: DbSchemaVersion;
}
/**
 * A column in a schema table.
 */
export interface JsonSchemaColumn extends SchemaReferenceByIndex<ColumnIndex>, JsonDatabaseObject {
    /**
     * Verbatim DDL for the column (after the name of the column)
     *
     * TODO: either sanitize this string or disallow in Client Installations
     */
    /**
     * Is it column a generated value?
     */
    isGenerated?: SchemaColumnIsGenerated;
    /**
     * How many ids to allocate at a time
     */
    allocationSize?: SchemaColumnAllocationSize;
    /**
     * One-to-Many relations that are mapped to this column.
     */
    manyRelationColumnRefs: JsonSchemaRelationColumn[];
    /**
     * Name of the column.
     */
    name: ColumnName;
    notNull: ColumnNotNull;
    /**
     * Properties that are mapped to this column.
     */
    propertyRefs: PropertyReference[];
    /**
     * Type of the column.
     */
    type: SQLDataType;
}
export interface IdKeyArrayByIdColumnIndex extends Array<(number | string)> {
}
export interface DbColumn extends SchemaReferenceByIndex<ColumnIndex>, DatabaseObject {
    allocationSize?: SchemaColumnAllocationSize;
    entity: DbEntity;
    id: ColumnId;
    /**
     * Id index of this column (if it's an ID column).
     */
    idIndex?: ColumnIndex;
    isGenerated: SchemaColumnIsGenerated;
    /**
     * In which ManyToOne relations is this column present.
     */
    manyRelationColumns: DbRelationColumn[];
    name: ColumnName;
    notNull: ColumnNotNull;
    /**
     * In which OneToMany relations is this column present.
     */
    oneRelationColumns: DbRelationColumn[];
    /**
     * In which properties is this column present.
     */
    propertyColumns: DbPropertyColumn[];
    propertyColumnMap: {
        [propertyIndex: number]: DbPropertyColumn;
    };
    type: SQLDataType;
}
export interface SchemaReferenceByIndex<ID extends number> {
    /**
     * Index of the referenced object.
     */
    index: ID;
}
export interface PropertyReference extends SchemaReferenceByIndex<PropertyIndex> {
}
/**
 * A schema relation.
 */
export interface JsonSchemaRelation extends SchemaReferenceByIndex<RelationIndex>, JsonDatabaseObject {
    /**
     * Foreign key definition, if provided by (R)JoinColumn(s)
     */
    foreignKey?: DatabaseForeignKey;
    /**
     * Many-to-One configuration object (or 'true' if @ManyToOne but no object is present).
     */
    manyToOneElems?: DatabaseManyToOneElements | true;
    /**
     * One-to-Many configuration object (if @OneToMany).
     */
    oneToManyElems?: DatabaseOneToManyElements;
    /**
     * Type of the relation (Many-to-One or One-to-Many)
     */
    relationType: EntityRelationType;
    /**
     * A property that is mapped to this relation.
     */
    propertyRef: PropertyReference;
    /**
     * True if join automatically includes REPOSITORY_ID.
     * Not needed - all joins to and from Repository entities are automatically repository
     * joins
     */
    /**
     * True if this relation has @Id() decorator.
     */
    isId: boolean;
    /**
     * Related table's schema index (as defined in schema-local schema references).
     */
    relationTableSchemaIndex?: SchemaIndex;
    /**
     * Related table index.
     */
    relationTableIndex: TableIndex;
}
export interface DbRelation extends SchemaReferenceByIndex<RelationIndex>, DatabaseObject {
    id: RelationId;
    entity: DbEntity;
    foreignKey: DatabaseForeignKey;
    isId: boolean;
    /**
     * Not needed - all joins to and from Repository entities are automatically repository
     * joins
     */
    manyRelationColumns: DbRelationColumn[];
    manyToOneElems: DatabaseManyToOneElements;
    oneRelationColumns?: DbRelationColumn[];
    oneToManyElems: DatabaseOneToManyElements;
    property: DbProperty;
    relationEntity: DbEntity;
    relationType: EntityRelationType;
}
export interface JsonSchemaRelationColumn extends JsonDatabaseObject {
    manyRelationIndex: RelationIndex;
    oneSchemaIndex: SchemaIndex;
    oneTableIndex: TableIndex;
    oneRelationIndex?: RelationIndex;
    oneColumnIndex: ColumnIndex;
}
export interface DbRelationColumn extends DatabaseObject {
    id: number;
    manyColumn: DbColumn;
    /**
     * Only present if @ManyToOne side of the relationship is defined.
     */
    manyRelation?: DbRelation;
    oneColumn: DbColumn;
    /**
     * Only present if @OneToMany side of the relationship is defined.
     */
    oneRelation?: DbRelation;
    parentRelation: DbRelation;
}
//# sourceMappingURL=Property.d.ts.map