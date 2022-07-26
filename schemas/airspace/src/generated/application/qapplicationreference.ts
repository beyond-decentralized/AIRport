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
	ApplicationVersionGraph,
	ApplicationVersionEId,
	ApplicationVersionEOptionalId,
	ApplicationVersionEUpdateProperties,
	ApplicationVersionESelect,
	QApplicationVersion,
	QApplicationVersionQId,
	QApplicationVersionQRelation,
} from './qapplicationversion';
import {
	IApplicationVersion,
} from './applicationversion';
import {
	IApplicationReference,
} from './applicationreference';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationReferenceESelect
    extends VersionedApplicationObjectESelect, ApplicationReferenceEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;

	// Id Relations - full property interfaces
	ownApplicationVersion?: ApplicationVersionESelect;
	referencedApplicationVersion?: ApplicationVersionESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationReferenceEId
    extends VersionedApplicationObjectEId {
	// Id Properties

	// Id Relations - Ids only
	ownApplicationVersion: ApplicationVersionEId;
	referencedApplicationVersion: ApplicationVersionEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationReferenceEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	ownApplicationVersion?: ApplicationVersionEOptionalId;
	referencedApplicationVersion?: ApplicationVersionEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationReferenceEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationReferenceGraph
	extends ApplicationReferenceEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;

	// Relations
	ownApplicationVersion?: ApplicationVersionGraph;
	referencedApplicationVersion?: ApplicationVersionGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationReferenceEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	APPLICATION_REFERENCE_INDEX?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationReferenceECreateProperties
extends Partial<ApplicationReferenceEId>, ApplicationReferenceEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationReferenceECreateColumns
extends ApplicationReferenceEId, ApplicationReferenceEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationReference extends QVersionedApplicationObject
{
	// Id Fields

	// Id Relations
	ownApplicationVersion: QApplicationVersionQRelation;
	referencedApplicationVersion: QApplicationVersionQRelation;

	// Non-Id Fields
	index: IQNumberField;

	// Non-Id Relations

}

// Entity Id Interface
export interface QApplicationReferenceQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields

	// Id Relations
	ownApplicationVersion: QApplicationVersionQId;
	referencedApplicationVersion: QApplicationVersionQId;


}

// Entity Relation Interface
export interface QApplicationReferenceQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationReference>, QApplicationReferenceQId {
}