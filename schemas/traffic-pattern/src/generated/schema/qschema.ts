import {
	IQEntityInternal,
	IEntityIdProperties,
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
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	IDomain,
	DomainEId,
	DomainEOptionalId,
	DomainEUpdateProperties,
	DomainESelect,
	QDomain,
	QDomainQId,
	QDomainQRelation,
} from '@airport/territory';
import {
	ISchemaVersion,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
} from './qschemaversion';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISchema {
	
	// Id Properties
	index?: number;

	// Id Relations

	// Non-Id Properties
	domainName?: string;
	name?: string;
	status?: number;

	// Non-Id Relations
	domain?: IDomain;
	versions?: ISchemaVersion[];
	currentVersion?: ISchemaVersion;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaESelect
    extends IEntitySelectProperties, SchemaEOptionalId, SchemaEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainESelect;
	versions?: SchemaVersionESelect;
	currentVersion?: SchemaVersionESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SchemaEId
    extends IEntityIdProperties {
	// Id Properties
	index: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SchemaEOptionalId {
	// Id Properties
	index?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SchemaEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	domainName?: string | IQStringField;
	name?: string | IQStringField;
	status?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	domain?: DomainEOptionalId;
	currentVersion?: SchemaVersionEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	DOMAIN_NAME?: string | IQStringField;
	SCHEMA_NAME?: string | IQStringField;
	STATUS?: number | IQNumberField;
	DOMAIN_ID?: number | IQNumberField;
	CURRENT_VERSION_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaECreateProperties
extends SchemaEId, SchemaEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SchemaECreateColumns
extends SchemaEId, SchemaEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSchema extends QEntity
{
	// Id Fields
	index: IQNumberField;

	// Id Relations

	// Non-Id Fields
	domainName: IQStringField;
	name: IQStringField;
	status: IQNumberField;

	// Non-Id Relations
	domain: QDomainQRelation;
	versions: IQOneToManyRelation<QSchemaVersion>;
	currentVersion: QSchemaVersionQRelation;

}


// Entity Id Interface
export interface QSchemaQId
{
	
	// Id Fields
	index: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSchemaQRelation
	extends QRelation<QSchema>, QSchemaQId {
}

