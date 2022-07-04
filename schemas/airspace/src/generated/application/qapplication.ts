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
	DomainGraph,
	DomainEId,
	DomainEOptionalId,
	DomainEUpdateProperties,
	DomainESelect,
	QDomain,
	QDomainQId,
	QDomainQRelation,
} from './qdomain';
import {
	IDomain,
} from './domain';
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
	ApplicationCurrentVersionGraph,
	ApplicationCurrentVersionEId,
	ApplicationCurrentVersionEOptionalId,
	ApplicationCurrentVersionEUpdateProperties,
	ApplicationCurrentVersionESelect,
	QApplicationCurrentVersion,
	QApplicationCurrentVersionQId,
	QApplicationCurrentVersionQRelation,
} from './qapplicationcurrentversion';
import {
	IApplicationCurrentVersion,
} from './applicationcurrentversion';
import {
	IApplication,
} from './application';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationESelect
    extends IEntitySelectProperties, ApplicationEOptionalId {
	// Non-Id Properties
	GUID?: string | IQStringField;
	scope?: string | IQStringField;
	name?: string | IQStringField;
	fullName?: string | IQStringField;
	status?: string | IQStringField;
	signature?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainESelect;
	versions?: ApplicationVersionESelect;
	currentVersion?: ApplicationCurrentVersionESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationEId
    extends IEntityIdProperties {
	// Id Properties
	index: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationEOptionalId {
	// Id Properties
	index?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	GUID?: string | IQStringField;
	scope?: string | IQStringField;
	name?: string | IQStringField;
	fullName?: string | IQStringField;
	status?: string | IQStringField;
	signature?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	domain?: DomainEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationGraph
	extends ApplicationEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	GUID?: string | IQStringField;
	scope?: string | IQStringField;
	name?: string | IQStringField;
	fullName?: string | IQStringField;
	status?: string | IQStringField;
	signature?: string | IQStringField;

	// Relations
	domain?: DomainGraph;
	versions?: ApplicationVersionGraph[];
	currentVersion?: ApplicationCurrentVersionGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	GUID?: string | IQStringField;
	SCOPE?: string | IQStringField;
	APPLICATION_NAME?: string | IQStringField;
	FULL_APPLICATION_NAME?: string | IQStringField;
	STATUS?: string | IQStringField;
	SIGNATURE?: string | IQStringField;
	DOMAIN_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationECreateProperties
extends Partial<ApplicationEId>, ApplicationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationECreateColumns
extends ApplicationEId, ApplicationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplication extends IQEntity
{
	// Id Fields
	index: IQNumberField;

	// Id Relations

	// Non-Id Fields
	GUID: IQStringField;
	scope: IQStringField;
	name: IQStringField;
	fullName: IQStringField;
	status: IQStringField;
	signature: IQStringField;

	// Non-Id Relations
	domain: QDomainQRelation;
	versions: IQOneToManyRelation<QApplicationVersion>;
	currentVersion: IQOneToManyRelation<QApplicationCurrentVersion>;

}


// Entity Id Interface
export interface QApplicationQId
{
	
	// Id Fields
	index: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationQRelation
	extends IQRelation<QApplication>, QApplicationQId {
}

