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
	ChildGraph,
	ChildEId,
	ChildEOptionalId,
	ChildEUpdateProperties,
	ChildESelect,
	QChild,
	QChildQId,
	QChildQRelation,
} from './qchild';
import {
	Child,
} from '../ddl/Child';
import {
	Parent,
} from '../ddl/Parent';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ParentESelect
    extends IEntitySelectProperties, ParentEOptionalId {
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	children?: ChildESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ParentEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ParentEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ParentEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ParentGraph
	extends ParentEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Relations
	children?: ChildGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ParentEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	BOOL?: boolean | IQBooleanField;
	NUM?: number | IQNumberField;
	STR?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ParentECreateProperties
extends Partial<ParentEId>, ParentEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ParentECreateColumns
extends ParentEId, ParentEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QParent extends IQEntity<Parent>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	bool: IQBooleanField;
	num: IQNumberField;
	str: IQStringField;

	// Non-Id Relations
	children: IQOneToManyRelation<Child, QChild>;

}


// Entity Id Interface
export interface QParentQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QParentQRelation
	extends IQRelation<Parent, QParent>, QParentQId {
}

