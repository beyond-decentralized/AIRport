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
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
	TableConfiguration,
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
	ApplicationOperationGraph,
	ApplicationOperationEId,
	ApplicationOperationEOptionalId,
	ApplicationOperationEUpdateProperties,
	ApplicationOperationESelect,
	QApplicationOperation,
	QApplicationOperationQId,
	QApplicationOperationQRelation,
} from './qapplicationoperation';
import {
	IApplicationOperation,
} from './applicationoperation';
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
	IApplicationEntity,
} from './applicationentity';


declare function require(moduleName: string): any;


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
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

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
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEntityEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

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
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
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
	isRepositoryEntity?: boolean | IQBooleanField;
	name?: string | IQStringField;
	tableConfig?: TableConfiguration | IQStringField;

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
	DEPRECATED_SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
	REMOVED_IN_APPLICATION_VERSION_ID?: number | IQNumberField;
	SINCE_APPLICATION_VERSION_ID?: number | IQNumberField;
	TABLE_INDEX?: number | IQNumberField;
	IS_LOCAL?: boolean | IQBooleanField;
	IS_REPOSITORY_ENTITY?: boolean | IQBooleanField;
	NAME?: string | IQStringField;
	TABLE_CONFIGURATION?: string | IQStringField;
	APPLICATION_VERSION_ID?: number | IQNumberField;

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
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationEntity extends QVersionedApplicationObject
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	index: IQNumberField;
	isLocal: IQBooleanField;
	isRepositoryEntity: IQBooleanField;
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
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationEntityQRelation
	extends QVersionedApplicationObjectQRelation<QApplicationEntity>, QApplicationEntityQId {
}

