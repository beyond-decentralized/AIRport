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
} from './qVersionedApplicationObject';
import {
	ApplicationEntity_TableConfiguration,
} from '@airport/tarmaq-entity';
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
	ApplicationColumnGraph,
	ApplicationColumnEId,
	ApplicationColumnEOptionalId,
	ApplicationColumnEUpdateProperties,
	ApplicationColumnESelect,
	QApplicationColumn,
	QApplicationColumnQId,
	QApplicationColumnQRelation,
} from './qApplicationColumn';
import {
	IApplicationColumn,
} from './ApplicationColumn';
import {
	ApplicationOperationGraph,
	ApplicationOperationEId,
	ApplicationOperationEOptionalId,
	ApplicationOperationEUpdateProperties,
	ApplicationOperationESelect,
	QApplicationOperation,
	QApplicationOperationQId,
	QApplicationOperationQRelation,
} from './qApplicationOperation';
import {
	IApplicationOperation,
} from './ApplicationOperation';
import {
	ApplicationPropertyGraph,
	ApplicationPropertyEId,
	ApplicationPropertyEOptionalId,
	ApplicationPropertyEUpdateProperties,
	ApplicationPropertyESelect,
	QApplicationProperty,
	QApplicationPropertyQId,
	QApplicationPropertyQRelation,
} from './qApplicationProperty';
import {
	IApplicationProperty,
} from './ApplicationProperty';
import {
	ApplicationRelationGraph,
	ApplicationRelationEId,
	ApplicationRelationEOptionalId,
	ApplicationRelationEUpdateProperties,
	ApplicationRelationESelect,
	QApplicationRelation,
	QApplicationRelationQId,
	QApplicationRelationQRelation,
} from './qApplicationRelation';
import {
	IApplicationRelation,
} from './ApplicationRelation';
import {
	IApplicationEntity,
} from './ApplicationEntity';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationEntityESelect
    extends VersionedApplicationObjectESelect, ApplicationEntityEOptionalId {
	// Non-Id Properties
	index?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;
	isAirEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: ApplicationEntity_TableConfiguration | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applicationVersion?: ApplicationVersionESelect;
	columns?: ApplicationColumnESelect;
	operations?: ApplicationOperationESelect;
	properties?: ApplicationPropertyESelect;
	relations?: ApplicationRelationESelect;
	relationReferences?: ApplicationRelationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationEntityEId
    extends VersionedApplicationObjectEId {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEntityEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationEntityEUpdateProperties
	extends VersionedApplicationObjectEUpdateProperties {
	// Non-Id Properties
	index?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;
	isAirEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: ApplicationEntity_TableConfiguration | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
	applicationVersion?: ApplicationVersionEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationEntityGraph
	extends ApplicationEntityEOptionalId, VersionedApplicationObjectGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	index?: number | IQNumberField;
	isLocal?: boolean | IQBooleanField;
	isAirEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: ApplicationEntity_TableConfiguration | IQStringField;

	// Relations
	applicationVersion?: ApplicationVersionGraph;
	columns?: ApplicationColumnGraph[];
	operations?: ApplicationOperationGraph[];
	properties?: ApplicationPropertyGraph[];
	relations?: ApplicationRelationGraph[];
	relationReferences?: ApplicationRelationGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEntityEUpdateColumns
	extends VersionedApplicationObjectEUpdateColumns {
	// Non-Id Columns
	DEPRECATED_SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_LID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_LID?: number | IQNumberField;
	TABLE_INDEX?: number | IQNumberField;
	IS_LOCAL?: boolean | IQBooleanField;
	IS_AIR_ENTITY?: boolean | IQBooleanField;
	NAME?: string | IQStringField;
	TABLE_CONFIGURATION?: string | IQStringField;
	APPLICATION_VERSION_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationEntityECreateProperties
extends Partial<ApplicationEntityEId>, ApplicationEntityEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationEntityECreateColumns
extends ApplicationEntityEId, ApplicationEntityEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationEntity<IQE extends QApplicationEntity = any> extends QVersionedApplicationObject<IQE | QApplicationEntity>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	isLocal: IQBooleanField;
	isAirEntity: IQBooleanField;
	name: IQStringField;
	tableConfig: IQStringField;

	// Non-Id Relations
	applicationVersion: QApplicationVersionQRelation;
	columns: IQOneToManyRelation<QApplicationColumn>;
	operations: IQOneToManyRelation<QApplicationOperation>;
	properties: IQOneToManyRelation<QApplicationProperty>;
	relations: IQOneToManyRelation<QApplicationRelation>;
	relationReferences: IQOneToManyRelation<QApplicationRelation>;

}

// Entity Id Interface
export interface QApplicationEntityQId extends QVersionedApplicationObjectQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationEntityQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationEntity>, QApplicationEntityQId {
}