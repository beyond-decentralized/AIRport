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
	ForeignKey,
	ManyToOneElements,
	OneToManyElements,
} from '@airport/tarmaq-entity'
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
	ApplicationRelationColumnGraph,
	ApplicationRelationColumnEId,
	ApplicationRelationColumnEOptionalId,
	ApplicationRelationColumnEUpdateProperties,
	ApplicationRelationColumnESelect,
	QApplicationRelationColumn,
	QApplicationRelationColumnQId,
	QApplicationRelationColumnQRelation,
} from './qapplicationrelationcolumn';
import {
	IApplicationRelationColumn,
} from './applicationrelationcolumn';
import {
	IApplicationRelation,
} from './applicationrelation';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationRelationESelect
    extends VersionedApplicationObjectESelect, ApplicationRelationEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	property?: ApplicationPropertyESelect;
	entity?: ApplicationEntityESelect;
	relationEntity?: ApplicationEntityESelect;
	manyRelationColumns?: ApplicationRelationColumnESelect;
	oneRelationColumns?: ApplicationRelationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationRelationEId
    extends VersionedApplicationObjectEId {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationRelationEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationRelationEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Non-Id Relations - _localIds only & no OneToMany's
	property?: ApplicationPropertyEOptionalId;
	entity?: ApplicationEntityEOptionalId;
	relationEntity?: ApplicationEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationRelationGraph
	extends ApplicationRelationEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;
	foreignKey?: ForeignKey | IQStringField;
	manyToOneElems?: ManyToOneElements | IQStringField;
	oneToManyElems?: OneToManyElements | IQStringField;
	relationType?: string | IQStringField;
	isId?: boolean | IQBooleanField;

	// Relations
	property?: ApplicationPropertyGraph;
	entity?: ApplicationEntityGraph;
	relationEntity?: ApplicationEntityGraph;
	manyRelationColumns?: ApplicationRelationColumnGraph[];
	oneRelationColumns?: ApplicationRelationColumnGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationRelationEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	RELATION_INDEX?: number | IQNumberField;
	FOREIGN_KEY?: string | IQStringField;
	MANY_TO_ONE_ELEMENTS?: string | IQStringField;
	ONE_TO_MANY_ELEMENTS?: string | IQStringField;
	RELATION_TYPE?: string | IQStringField;
	IS_LID?: boolean | IQBooleanField;
	APPLICATION_PROPERTY_LID?: number | IQNumberField;
	APPLICATION_ENTITY_LID?: number | IQNumberField;
	RELATION_APPLICATION_ENTITY_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationRelationECreateProperties
extends Partial<ApplicationRelationEId>, ApplicationRelationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationRelationECreateColumns
extends ApplicationRelationEId, ApplicationRelationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationRelation extends QVersionedApplicationObject
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	foreignKey: IQStringField;
	manyToOneElems: IQStringField;
	oneToManyElems: IQStringField;
	relationType: IQStringField;
	isId: IQBooleanField;

	// Non-Id Relations
	property: QApplicationPropertyQRelation;
	entity: QApplicationEntityQRelation;
	relationEntity: QApplicationEntityQRelation;
	manyRelationColumns: IQOneToManyRelation<QApplicationRelationColumn>;
	oneRelationColumns: IQOneToManyRelation<QApplicationRelationColumn>;

}


// Entity Id Interface
export interface QApplicationRelationQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationRelationQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationRelation>, QApplicationRelationQId {
}

