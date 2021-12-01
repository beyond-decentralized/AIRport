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
} from '@airport/air-control';
import {
	ApplicationGraph,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
} from './qapplication';
import {
	Application,
} from '../../ddl/application/Application';
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
	ApplicationEntity,
} from '../../ddl/application/ApplicationEntity';
import {
	ApplicationReferenceGraph,
	ApplicationReferenceEId,
	ApplicationReferenceEOptionalId,
	ApplicationReferenceEUpdateProperties,
	ApplicationReferenceESelect,
	QApplicationReference,
	QApplicationReferenceQId,
	QApplicationReferenceQRelation,
} from './qapplicationreference';
import {
	ApplicationReference,
} from '../../ddl/application/ApplicationReference';
import {
	ApplicationVersion,
} from '../../ddl/application/ApplicationVersion';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ApplicationVersionESelect
    extends IEntitySelectProperties, ApplicationVersionEOptionalId {
	// Non-Id Properties
	integerVersion?: number | IQNumberField;
	versionString?: string | IQStringField;
	majorVersion?: number | IQNumberField;
	minorVersion?: number | IQNumberField;
	patchVersion?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	application?: ApplicationESelect;
	entities?: ApplicationEntityESelect;
	references?: ApplicationReferenceESelect;
	referencedBy?: ApplicationReferenceESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ApplicationVersionEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationVersionEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ApplicationVersionEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	integerVersion?: number | IQNumberField;
	versionString?: string | IQStringField;
	majorVersion?: number | IQNumberField;
	minorVersion?: number | IQNumberField;
	patchVersion?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	application?: ApplicationEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ApplicationVersionGraph
	extends ApplicationVersionEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	integerVersion?: number | IQNumberField;
	versionString?: string | IQStringField;
	majorVersion?: number | IQNumberField;
	minorVersion?: number | IQNumberField;
	patchVersion?: number | IQNumberField;

	// Relations
	application?: ApplicationGraph;
	entities?: ApplicationEntityGraph[];
	references?: ApplicationReferenceGraph[];
	referencedBy?: ApplicationReferenceGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ApplicationVersionEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	INTEGER_VERSION?: number | IQNumberField;
	VERSION_STRING?: string | IQStringField;
	MAJOR_VERSION?: number | IQNumberField;
	MINOR_VERSION?: number | IQNumberField;
	PATCH_VERSION?: number | IQNumberField;
	APPLICATION_INDEX?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ApplicationVersionECreateProperties
extends Partial<ApplicationVersionEId>, ApplicationVersionEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ApplicationVersionECreateColumns
extends ApplicationVersionEId, ApplicationVersionEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QApplicationVersion extends IQEntity<ApplicationVersion>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	integerVersion: IQNumberField;
	versionString: IQStringField;
	majorVersion: IQNumberField;
	minorVersion: IQNumberField;
	patchVersion: IQNumberField;

	// Non-Id Relations
	application: QApplicationQRelation;
	entities: IQOneToManyRelation<ApplicationEntity, QApplicationEntity>;
	references: IQOneToManyRelation<ApplicationReference, QApplicationReference>;
	referencedBy: IQOneToManyRelation<ApplicationReference, QApplicationReference>;

}


// Entity Id Interface
export interface QApplicationVersionQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationVersionQRelation
	extends IQRelation<ApplicationVersion, QApplicationVersion>, QApplicationVersionQId {
}
