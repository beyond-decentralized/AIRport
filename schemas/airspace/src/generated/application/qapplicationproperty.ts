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
	ApplicationPropertyColumnGraph,
	ApplicationPropertyColumnEId,
	ApplicationPropertyColumnEOptionalId,
	ApplicationPropertyColumnEUpdateProperties,
	ApplicationPropertyColumnESelect,
	QApplicationPropertyColumn,
	QApplicationPropertyColumnQId,
	QApplicationPropertyColumnQRelation,
} from './qapplicationpropertycolumn';
import {
	IApplicationPropertyColumn,
} from './applicationpropertycolumn';
import {
	ApplicationRelationGraph,
	ApplicationRelationEId,
	ApplicationRelationEOptionalId,
	ApplicationRelationEUpdateProperties,
	ApplicationRelationESelect,
	QApplicationRelation,
	QApplicationRelationQId,
	QApplicationRelationQRelation,
} from './qapplicationrelation';
import {
	IApplicationRelation,
} from './applicationrelation';
import {
	IApplicationProperty,
} from './applicationproperty';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationPropertyESelect
    extends VersionedApplicationObjectESelect, ApplicationPropertyEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	name?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	entity?: ApplicationEntityESelect;
	propertyColumns?: ApplicationPropertyColumnESelect;
	relation?: ApplicationRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationPropertyEId
    extends VersionedApplicationObjectEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationPropertyEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationPropertyEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	name?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	entity?: ApplicationEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationPropertyGraph
	extends ApplicationPropertyEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;
	name?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Relations
	entity?: ApplicationEntityGraph;
	propertyColumns?: ApplicationPropertyColumnGraph[];
	relation?: ApplicationRelationGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationPropertyEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_ID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
	PROPERTY_INDEX?: number | IQNumberField;
	NAME?: string | IQStringField;
	IS_ID?: boolean | IQBooleanField;
	APPLICATION_ENTITY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationPropertyECreateProperties
extends Partial<ApplicationPropertyEId>, ApplicationPropertyEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationPropertyECreateColumns
extends ApplicationPropertyEId, ApplicationPropertyEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationProperty extends QVersionedApplicationObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	name: IQStringField;
	isId: IQBooleanField;

	// Non-Id Relations
	entity: QApplicationEntityQRelation;
	propertyColumns: IQOneToManyRelation<QApplicationPropertyColumn>;
	relation: IQOneToManyRelation<QApplicationRelation>;

}


// Entity Id Interface
export interface QApplicationPropertyQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationPropertyQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationProperty>, QApplicationPropertyQId {
}

