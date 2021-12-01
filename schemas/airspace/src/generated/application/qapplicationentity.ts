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
	RawDelete,
	RawUpdate,
	TableConfiguration,
} from '@airport/air-control';
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
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';
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
	ApplicationColumn,
} from '../../ddl/application/ApplicationColumn';
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
	ApplicationOperation,
} from '../../ddl/application/ApplicationOperation';
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
	ApplicationProperty,
} from '../../ddl/application/ApplicationProperty';
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
	ApplicationRelation,
} from '../../ddl/application/ApplicationRelation';
import {
	ApplicationEntity,
} from '../../ddl/application/ApplicationEntity';


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
export interface QApplicationEntity extends QVersionedApplicationObject<ApplicationEntity>
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
	columns: IQOneToManyRelation<ApplicationColumn, QApplicationColumn>;
	operations: IQOneToManyRelation<ApplicationOperation, QApplicationOperation>;
	properties: IQOneToManyRelation<ApplicationProperty, QApplicationProperty>;
	relations: IQOneToManyRelation<ApplicationRelation, QApplicationRelation>;
	relationReferences: IQOneToManyRelation<ApplicationRelation, QApplicationRelation>;

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
	extends QVersionedApplicationObjectQRelation<ApplicationEntity, QApplicationEntity>, QApplicationEntityQId {
}

