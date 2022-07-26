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
	VersionedApplicationObjectGraph,
	VersionedApplicationObjectEId,
	VersionedApplicationObjectEUpdateColumns,
	VersionedApplicationObjectEUpdateProperties,
	VersionedApplicationObjectESelect,
	QVersionedApplicationObjectQId,
	QVersionedApplicationObjectQRelation,
	QVersionedApplicationObject,
} from './qversionedapplicationobject';
import {
	Operation_Rule,
} from '@airport/ground-control';
import {
	ApplicationEntityGraph,
	ApplicationEntityEId,
	ApplicationEntityEOptionalId,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityESelect,
	QApplicationEntity,
	QApplicationEntityQId,
	QApplicationEntityQRelation,
} from './qapplicationentity';
import {
	IApplicationEntity,
} from './applicationentity';
import {
	IApplicationOperation,
} from './applicationoperation';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationOperationESelect
    extends VersionedApplicationObjectESelect, ApplicationOperationEOptionalId {
	// Non-Id Properties
	type?: number | IQNumberField;
	name?: string | IQStringField;
	rule?: Operation_Rule | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationOperationEId
    extends VersionedApplicationObjectEId {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationOperationEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationOperationEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties
	type?: number | IQNumberField;
	name?: string | IQStringField;
	rule?: Operation_Rule | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	entity?: ApplicationEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationOperationGraph
	extends ApplicationOperationEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	type?: number | IQNumberField;
	name?: string | IQStringField;
	rule?: Operation_Rule | IQStringField;

	// Relations
	entity?: ApplicationEntityGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationOperationEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	TYPE?: number | IQNumberField;
	NAME?: string | IQStringField;
	RULE?: string | IQStringField;
	APPLICATION_ENTITY_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationOperationECreateProperties
extends Partial<ApplicationOperationEId>, ApplicationOperationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationOperationECreateColumns
extends ApplicationOperationEId, ApplicationOperationEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationOperation extends QVersionedApplicationObject
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	type: IQNumberField;
	name: IQStringField;
	rule: IQStringField;

	// Non-Id Relations
	entity: QApplicationEntityQRelation;

}

// Entity Id Interface
export interface QApplicationOperationQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationOperationQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationOperation>, QApplicationOperationQId {
}