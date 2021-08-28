import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntitySearch,
	IEntitySearchOne,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	ParentGraph,
	ParentEId,
	ParentEOptionalId,
	ParentEUpdateProperties,
	ParentESelect,
	QParent,
	QParentQId,
	QParentQRelation,
} from './qparent';
import {
	Parent,
} from '../ddl/Parent';
import {
	Child,
} from '../ddl/Child';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ChildESelect
    extends IEntitySelectProperties, ChildEOptionalId {
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	parent?: ParentESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ChildEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ChildEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ChildEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	parent?: ParentEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ChildGraph
	extends ChildEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Relations
	parent?: ParentGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ChildEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	BOOL?: boolean | IQBooleanField;
	NUM?: number | IQNumberField;
	STR?: string | IQStringField;
	PARENTID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ChildECreateProperties
extends Partial<ChildEId>, ChildEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ChildECreateColumns
extends ChildEId, ChildEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QChild extends IQEntity<Child>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	bool: IQBooleanField;
	num: IQNumberField;
	str: IQStringField;

	// Non-Id Relations
	parent: QParentQRelation;

}


// Entity Id Interface
export interface QChildQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QChildQRelation
	extends IQRelation<Child, QChild>, QChildQId {
}

