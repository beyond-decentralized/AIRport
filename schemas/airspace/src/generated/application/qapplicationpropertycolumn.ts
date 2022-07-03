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
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
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
	ApplicationColumnGraph,
	ApplicationColumnEId,
	ApplicationColumnEOptionalId,
	ApplicationColumnEUpdateProperties,
	ApplicationColumnESelect,
	QApplicationColumn,
	QApplicationColumnQId,
	QApplicationColumnQRelation,
} from './qapplicationcolumn';
import {
	IApplicationColumn,
} from './applicationcolumn';
import {
	ApplicationPropertyGraph,
	ApplicationPropertyEId,
	ApplicationPropertyEOptionalId,
	ApplicationPropertyEUpdateProperties,
	ApplicationPropertyESelect,
	QApplicationProperty,
	QApplicationPropertyQId,
	QApplicationPropertyQRelation,
} from './qapplicationproperty';
import {
	IApplicationProperty,
} from './applicationproperty';
import {
	IApplicationPropertyColumn,
} from './applicationpropertycolumn';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationPropertyColumnESelect
    extends VersionedApplicationObjectESelect, ApplicationPropertyColumnEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	column?: ApplicationColumnESelect;
	property?: ApplicationPropertyESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationPropertyColumnEId
    extends VersionedApplicationObjectEId {
	// Id Properties

	// Id Relations - Ids only
	column: ApplicationColumnEId;
	property: ApplicationPropertyEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationPropertyColumnEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	column?: ApplicationColumnEOptionalId;
	property?: ApplicationPropertyEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationPropertyColumnEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationPropertyColumnGraph
	extends ApplicationPropertyColumnEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	column?: ApplicationColumnGraph;
	property?: ApplicationPropertyGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationPropertyColumnEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_ID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationPropertyColumnECreateProperties
extends Partial<ApplicationPropertyColumnEId>, ApplicationPropertyColumnEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationPropertyColumnECreateColumns
extends ApplicationPropertyColumnEId, ApplicationPropertyColumnEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationPropertyColumn extends QVersionedApplicationObject
{
	// Id Fields

	// Id Relations
	column: QApplicationColumnQRelation;
	property: QApplicationPropertyQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QApplicationPropertyColumnQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields

	// Id Relations
	column: QApplicationColumnQId;
	property: QApplicationPropertyQId;


}

// Entity Relation Interface
export interface QApplicationPropertyColumnQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationPropertyColumn>, QApplicationPropertyColumnQId {
}

