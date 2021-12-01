import { DatabaseForeignKey, DatabaseManyToOneElements, DatabaseObject, DatabaseOneToManyElements, DbApplicationVersion, EntityRelationType, JsonDatabaseObject, SQLDataType } from '../../index';
import { DbEntity, TableIndex } from './Entity';
import { ApplicationIndex } from './Application';
export declare type ColumnId = number;
export declare type ColumnIndex = number;
export declare type ColumnName = string;
export declare type ColumnNotNull = boolean;
export declare type ColumnPrecision = number;
export declare type ColumnScale = number;
export declare type PropertyId = number;
export declare type PropertyIndex = number;
export declare type PropertyIsId = boolean;
export declare type PropertyName = string;
export declare type RelationId = number;
export declare type RelationIndex = number;
export declare type ApplicationColumnIsGenerated = boolean;
export declare type ApplicationColumnAllocationSize = number;
/**
 * A property of an object in a application.
 * Parent properties for the entity are indexed at each child table,
 * and are the first entries.
 */
export interface JsonApplicationProperty extends ApplicationReferenceByIndex<PropertyIndex>, JsonDatabaseObject {
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
    columnRef?: ApplicationReferenceByIndex<ColumnIndex>;
    /**
     * A Relation that is represented by the property (if any).
     */
    relationRef?: ApplicationReferenceByIndex<RelationIndex>;
}
export interface DbProperty extends ApplicationReferenceByIndex<PropertyIndex>, DatabaseObject {
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
    sinceVersion: DbApplicationVersion;
}
/**
 * A column in a application table.
 */
export interface JsonApplicationColumn extends ApplicationReferenceByIndex<ColumnIndex>, JsonDatabaseObject {
    /**
     * Verbatim DDL for the column (after the name of the column)
     *
     * TODO: either sanitize this string or disallow in Client Installations
     */
    /**
     * Is it column a generated value?
     */
    isGenerated?: ApplicationColumnIsGenerated;
    /**
     * How many ids to allocate at a time
     */
    allocationSize?: ApplicationColumnAllocationSize;
    /**
     * One-to-Many relations that are mapped to this column.
     */
    manyRelationColumnRefs: JsonApplicationRelationColumn[];
    /**
     * Name of the column.
     */
    name: ColumnName;
    notNull: ColumnNotNull;
    precision?: number;
    /**
     * Properties that are mapped to this column.
     */
    propertyRefs: PropertyReference[];
    scale?: number;
    /**
     * Type of the column.
     */
    type: SQLDataType;
}
export interface IdKeyArrayByIdColumnIndex extends Array<(number | string)> {
}
export interface DbColumn extends ApplicationReferenceByIndex<ColumnIndex>, DatabaseObject {
    allocationSize?: ApplicationColumnAllocationSize;
    entity: DbEntity;
    id: ColumnId;
    /**
     * Id index of this column (if it's an ID column).
     */
    idIndex?: ColumnIndex;
    isGenerated: ApplicationColumnIsGenerated;
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
    precision?: number;
    /**
     * In which properties is this column present.
     */
    propertyColumns: DbPropertyColumn[];
    propertyColumnMap: {
        [propertyIndex: number]: DbPropertyColumn;
    };
    scale?: number;
    type: SQLDataType;
}
export interface ApplicationReferenceByIndex<ID extends number> {
    /**
     * Index of the referenced object.
     */
    index: ID;
}
export interface PropertyReference extends ApplicationReferenceByIndex<PropertyIndex> {
}
/**
 * A application relation.
 */
export interface JsonApplicationRelation extends ApplicationReferenceByIndex<RelationIndex>, JsonDatabaseObject {
    /**
     * Foreign key definition, if provided by (R)JoinColumn(s)
     */
    foreignKey?: DatabaseForeignKey;
    /**
     * Many-to-One configuration object (or 'true' if @ManyToOne but no object is present).
     */
    manyToOneElems?: DatabaseManyToOneElements;
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
     * Related table's application index (as defined in application-local application references).
     */
    relationTableApplicationIndex?: ApplicationIndex;
    /**
     * Related table index.
     */
    relationTableIndex: TableIndex;
}
export interface DbRelation extends ApplicationReferenceByIndex<RelationIndex>, DatabaseObject {
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
export interface JsonApplicationRelationColumn extends JsonDatabaseObject {
    manyRelationIndex: RelationIndex;
    oneApplicationIndex: ApplicationIndex;
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