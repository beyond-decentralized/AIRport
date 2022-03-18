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
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';
import {
	VersionedApplicationObject,
} from '../../ddl/application/VersionedApplicationObject';


declare function require(moduleName: string): any;


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

	// Non-Id Relations - ids only & no OneToMany's
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
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QVersionedApplicationObject<T> extends IQEntity<T>
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
export interface QVersionedApplicationObjectQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends IQRelation<SubType, SubQType>, QVersionedApplicationObjectQId {
}

