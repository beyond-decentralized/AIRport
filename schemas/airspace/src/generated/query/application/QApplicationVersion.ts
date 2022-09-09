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
	JsonApplicationWithLastIds,
} from '@airport/apron';
import {
	ApplicationGraph,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
} from './QApplication';
import {
	IApplication,
} from '../../entity/application/IApplication';
import {
	ApplicationEntityGraph,
	ApplicationEntityEId,
	ApplicationEntityEOptionalId,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityESelect,
	QApplicationEntity,
	QApplicationEntityQId,
	QApplicationEntityQRelation,
} from './QApplicationEntity';
import {
	IApplicationEntity,
} from '../../entity/application/IApplicationEntity';
import {
	ApplicationReferenceGraph,
	ApplicationReferenceEId,
	ApplicationReferenceEOptionalId,
	ApplicationReferenceEUpdateProperties,
	ApplicationReferenceESelect,
	QApplicationReference,
	QApplicationReferenceQId,
	QApplicationReferenceQRelation,
} from './QApplicationReference';
import {
	IApplicationReference,
} from '../../entity/application/IApplicationReference';
import {
	IApplicationVersion,
} from '../../entity/application/IApplicationVersion';


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
	jsonApplication?: JsonApplicationWithLastIds | IQStringField;

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
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ApplicationVersionEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

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
	jsonApplication?: JsonApplicationWithLastIds | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's
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
	jsonApplication?: JsonApplicationWithLastIds | IQStringField;

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
	JSON_APPLICATION?: string | IQStringField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QApplicationVersion<IQE extends QApplicationVersion = any> extends IQEntity<IQE | QApplicationVersion>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	integerVersion: IQNumberField;
	versionString: IQStringField;
	majorVersion: IQNumberField;
	minorVersion: IQNumberField;
	patchVersion: IQNumberField;
	jsonApplication: IQStringField;

	// Non-Id Relations
	application: QApplicationQRelation;
	entities: IQOneToManyRelation<QApplicationEntity>;
	references: IQOneToManyRelation<QApplicationReference>;
	referencedBy: IQOneToManyRelation<QApplicationReference>;

}

// Entity Id Interface
export interface QApplicationVersionQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QApplicationVersionQRelation
	extends IQRelation<QApplicationVersion>, QApplicationVersionQId {
}