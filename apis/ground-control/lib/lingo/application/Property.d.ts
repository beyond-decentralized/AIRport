import { DatabaseForeignKey, DatabaseManyToOneElements, DatabaseObject, DatabaseOneToManyElements, DbApplicationVersion, EntityRelationType, JsonDatabaseObject, SQLDataType } from '../../index';
import { DbEntity, ApplicationEntity_TableIndex } from './Entity';
import { Application_Index } from './Application';
export declare type ApplicationColumn_LocalId = number;
export declare type ApplicationColumn_Index = number;
export declare type ApplicationColumn_Name = string;
export declare type ApplicationColumn_NotNull = boolean;
export declare type ApplicationColumn_Precision = number;
export declare type ApplicationColumn_Scale = number;
export declare type ApplicationProperty_LocalId = number;
export declare type ApplicationProperty_Index = number;
export declare type ApplicationProperty_IsId = boolean;
export declare type ApplicationProperty_Name = string;
export declare type ApplicationRelation_LocalId = number;
export declare type ApplicationRelation_Index = number;
export declare type ApplicationColumn_IsGenerated = boolean;
export declare type ApplicationColumn_AllocationSize = number;
/**
 * A property of an object in a application.
 * Parent properties for the entity are indexed at each child table,
 * and are the first entries.
 */
export interface JsonApplicationProperty extends ApplicationReferenceByIndex<ApplicationProperty_Index>, JsonDatabaseObject {
    /**
     * Does this property consist of @Id columns?
     */
    isId: ApplicationProperty_IsId;
    /**
     * Name of the property.
     */
    name: ApplicationProperty_Name;
    /**
     * Column represented by the property.
     */
    columnRef?: ApplicationReferenceByIndex<ApplicationColumn_Index>;
    /**
     * A Relation that is represented by the property (if any).
     */
    relationRef?: ApplicationReferenceByIndex<ApplicationRelation_Index>;
}
export interface DbProperty extends ApplicationReferenceByIndex<ApplicationProperty_Index>, DatabaseObject {
    id: ApplicationProperty_LocalId;
    entity: DbEntity;
    name: ApplicationProperty_Name;
    isId: ApplicationProperty_IsId;
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
export interface JsonApplicationColumn extends ApplicationReferenceByIndex<ApplicationColumn_Index>, JsonDatabaseObject {
    /**
     * Verbatim DDL for the column (after the name of the column)
     *
     * TODO: either sanitize this string or disallow in Client Installations
     */
    /**
     * Is it column a generated value?
     */
    isGenerated?: ApplicationColumn_IsGenerated;
    /**
     * How many ids to allocate at a time
     */
    allocationSize?: ApplicationColumn_AllocationSize;
    /**
     * One-to-Many relations that are mapped to this column.
     */
    manyRelationColumnRefs: JsonApplicationRelationColumn[];
    /**
     * Name of the column.
     */
    name: ApplicationColumn_Name;
    notNull: ApplicationColumn_NotNull;
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
export interface DbColumn extends ApplicationReferenceByIndex<ApplicationColumn_Index>, DatabaseObject {
    allocationSize?: ApplicationColumn_AllocationSize;
    entity: DbEntity;
    id: ApplicationColumn_LocalId;
    /**
     * Id index of this column (if it's an ID column).
     */
    idIndex?: ApplicationColumn_Index;
    isGenerated: ApplicationColumn_IsGenerated;
    /**
     * In which ManyToOne relations is this column present.
     */
    manyRelationColumns: DbRelationColumn[];
    name: ApplicationColumn_Name;
    notNull: ApplicationColumn_NotNull;
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
export interface PropertyReference extends ApplicationReferenceByIndex<ApplicationProperty_Index> {
}
/**
 * A application relation.
 */
export interface JsonApplicationRelation extends ApplicationReferenceByIndex<ApplicationRelation_Index>, JsonDatabaseObject {
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
     * True if join automatically includes REPOSITORY_LID.
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
    relationTableApplication_Index?: Application_Index;
    /**
     * Related table index.
     */
    relationTableIndex: ApplicationEntity_TableIndex;
}
export interface DbRelation extends ApplicationReferenceByIndex<ApplicationRelation_Index>, DatabaseObject {
    id: ApplicationRelation_LocalId;
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
    manyRelationIndex: ApplicationRelation_Index;
    oneApplication_Index: Application_Index;
    oneTableIndex: ApplicationEntity_TableIndex;
    oneRelationIndex?: ApplicationRelation_Index;
    oneColumnIndex: ApplicationColumn_Index;
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