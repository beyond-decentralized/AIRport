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
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	Level2Graph,
	Level2EId,
	Level2EOptionalId,
	Level2EUpdateProperties,
	Level2ESelect,
	QLevel2,
	QLevel2QId,
	QLevel2QRelation,
} from './qlevel2';
import {
	Level2,
} from '../ddl/Level2';
import {
	Level1,
} from '../ddl/Level1';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface Level1ESelect
    extends IEntitySelectProperties, Level1EOptionalId {
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	contained?: Level2ESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface Level1EId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface Level1EOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface Level1EUpdateProperties
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
export interface Level1Graph
	extends Level1EOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	bool?: boolean | IQBooleanField;
	num?: number | IQNumberField;
	str?: string | IQStringField;

	// Relations
	contained?: Level2Graph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface Level1EUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	BOOL?: boolean | IQBooleanField;
	NUM?: number | IQNumberField;
	STR?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface Level1ECreateProperties
extends Partial<Level1EId>, Level1EUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface Level1ECreateColumns
extends Level1EId, Level1EUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLevel1 extends IQEntity<Level1>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	bool: IQBooleanField;
	num: IQNumberField;
	str: IQStringField;

	// Non-Id Relations
	contained: IQOneToManyRelation<Level2, QLevel2>;

}


// Entity Id Interface
export interface QLevel1QId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QLevel1QRelation
	extends IQRelation<Level1, QLevel1>, QLevel1QId {
}

