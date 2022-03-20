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
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	Level1Graph,
	Level1EId,
	Level1EOptionalId,
	Level1EUpdateProperties,
	Level1ESelect,
	QLevel1,
	QLevel1QId,
	QLevel1QRelation,
} from './qlevel1';
import {
	ILevel1,
} from './level1';
import {
	ILevel2,
} from './level2';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface Level2ESelect
    extends IEntitySelectProperties, Level2EOptionalId {
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	up?: Level1ESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface Level2EId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface Level2EOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface Level2EUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	up?: Level1EOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface Level2Graph
	extends Level2EOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Relations
	up?: Level1Graph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface Level2EUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	BOOL?: boolean | IQBooleanField;
	NUM?: number | IQNumberField;
	STR?: string | IQStringField;
	LEVEL1ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface Level2ECreateProperties
extends Partial<Level2EId>, Level2EUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface Level2ECreateColumns
extends Level2EId, Level2EUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLevel2 extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	bool: IQBooleanField;
	num: IQNumberField;
	str: IQStringField;

	// Non-Id Relations
	up: QLevel1QRelation;

}


// Entity Id Interface
export interface QLevel2QId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QLevel2QRelation
	extends IQRelation<QLevel2>, QLevel2QId {
}

