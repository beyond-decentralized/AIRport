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
	ApplicationVersionGraph,
	ApplicationVersionEId,
	ApplicationVersionEOptionalId,
	ApplicationVersionEUpdateProperties,
	ApplicationVersionESelect,
	QApplicationVersion,
	QApplicationVersionQId,
	QApplicationVersionQRelation,
} from './qApplicationVersion';
import {
	IApplicationVersion,
} from './ApplicationVersion';
import {
	IVersionedApplicationObject,
} from './VersionedApplicationObject';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface VersionedApplicationObjectESelect
    extends IEntitySelectProperties, VersionedApplicationObjectEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	deprecatedSinceVersion?: ApplicationVersionESelect;
	removedInVersion?: ApplicationVersionESelect;
	sinceVersion?: ApplicationVersionESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface VersionedApplicationObjectEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface VersionedApplicationObjectEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface VersionedApplicationObjectEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's
	deprecatedSinceVersion?: ApplicationVersionEOptionalId;
	removedInVersion?: ApplicationVersionEOptionalId;
	sinceVersion?: ApplicationVersionEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface VersionedApplicationObjectGraph
	extends VersionedApplicationObjectEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	deprecatedSinceVersion?: ApplicationVersionGraph;
	removedInVersion?: ApplicationVersionGraph;
	sinceVersion?: ApplicationVersionGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface VersionedApplicationObjectEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface VersionedApplicationObjectECreateProperties
extends Partial<VersionedApplicationObjectEId>, VersionedApplicationObjectEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface VersionedApplicationObjectECreateColumns
extends VersionedApplicationObjectEId, VersionedApplicationObjectEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QVersionedApplicationObject<IQE extends QVersionedApplicationObject = any> extends IQEntity<IQE | QVersionedApplicationObject>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	deprecatedSinceVersion: QApplicationVersionQRelation;
	removedInVersion: QApplicationVersionQRelation;
	sinceVersion: QApplicationVersionQRelation;

}

// Entity Id Interface
export interface QVersionedApplicationObjectQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QVersionedApplicationObjectQRelation<SubQType extends IQEntity>
	extends IQRelation<SubQType>, QVersionedApplicationObjectQId {
}