import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/tarmaq-query';
import {
	ISystemWideOperationId,
} from './systemwideoperationid';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SystemWideOperationIdESelect
    extends IEntitySelectProperties, SystemWideOperationIdEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SystemWideOperationIdEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SystemWideOperationIdEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SystemWideOperationIdEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SystemWideOperationIdGraph
	extends SystemWideOperationIdEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SystemWideOperationIdEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SystemWideOperationIdECreateProperties
extends Partial<SystemWideOperationIdEId>, SystemWideOperationIdEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SystemWideOperationIdECreateColumns
extends SystemWideOperationIdEId, SystemWideOperationIdEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QSystemWideOperationId<IQE extends QSystemWideOperationId = any> extends IQEntity<IQE | QSystemWideOperationId>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations

}

// Entity Id Interface
export interface QSystemWideOperationIdQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSystemWideOperationIdQRelation
	extends IQRelation<QSystemWideOperationId>, QSystemWideOperationIdQId {
}