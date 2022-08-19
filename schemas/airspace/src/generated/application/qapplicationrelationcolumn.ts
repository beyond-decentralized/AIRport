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
	IApplicationRelationColumn,
} from './applicationrelationcolumn';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationRelationColumnESelect
    extends VersionedApplicationObjectESelect, ApplicationRelationColumnEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	manyColumn?: ApplicationColumnESelect;
	oneColumn?: ApplicationColumnESelect;
	manyRelation?: ApplicationRelationESelect;
	oneRelation?: ApplicationRelationESelect;
	parentRelation?: ApplicationRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationRelationColumnEId
    extends VersionedApplicationObjectEId {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationRelationColumnEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationRelationColumnEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's
	manyColumn?: ApplicationColumnEOptionalId;
	oneColumn?: ApplicationColumnEOptionalId;
	manyRelation?: ApplicationRelationEOptionalId;
	oneRelation?: ApplicationRelationEOptionalId;
	parentRelation?: ApplicationRelationEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationRelationColumnGraph
	extends ApplicationRelationColumnEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	manyColumn?: ApplicationColumnGraph;
	oneColumn?: ApplicationColumnGraph;
	manyRelation?: ApplicationRelationGraph;
	oneRelation?: ApplicationRelationGraph;
	parentRelation?: ApplicationRelationGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationRelationColumnEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	MANY_APPLICATION_COLUMN_LID?: number | IQNumberField;
	ONE_APPLICATION_COLUMN_LID?: number | IQNumberField;
	MANY_APPLICATION_RELATION_LID?: number | IQNumberField;
	ONE_APPLICATION_RELATION_LID?: number | IQNumberField;
	PARENT_RELATION_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationRelationColumnECreateProperties
extends Partial<ApplicationRelationColumnEId>, ApplicationRelationColumnEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationRelationColumnECreateColumns
extends ApplicationRelationColumnEId, ApplicationRelationColumnEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationRelationColumn<IQE extends QApplicationRelationColumn = any> extends QVersionedApplicationObject<IQE | QApplicationRelationColumn>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	manyColumn: QApplicationColumnQRelation;
	oneColumn: QApplicationColumnQRelation;
	manyRelation: QApplicationRelationQRelation;
	oneRelation: QApplicationRelationQRelation;
	parentRelation: QApplicationRelationQRelation;

}

// Entity Id Interface
export interface QApplicationRelationColumnQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationRelationColumnQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationRelationColumn>, QApplicationRelationColumnQId {
}