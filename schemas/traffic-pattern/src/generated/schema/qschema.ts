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
	LastIds,
} from '@airport/security-check';
import {
	DomainGraph,
	DomainEId,
	DomainEOptionalId,
	DomainEUpdateProperties,
	DomainESelect,
	QDomain,
	QDomainQId,
	QDomainQRelation,
	Domain,
} from '@airport/territory';
import {
	SchemaVersionGraph,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
} from './qschemaversion';
import {
	SchemaVersion,
} from '../../ddl/schema/SchemaVersion';
import {
	SchemaCurrentVersionGraph,
	SchemaCurrentVersionEId,
	SchemaCurrentVersionEOptionalId,
	SchemaCurrentVersionEUpdateProperties,
	SchemaCurrentVersionESelect,
	QSchemaCurrentVersion,
	QSchemaCurrentVersionQId,
	QSchemaCurrentVersionQRelation,
} from './qschemacurrentversion';
import {
	SchemaCurrentVersion,
} from '../../ddl/schema/SchemaCurrentVersion';
import {
	Schema,
} from '../../ddl/schema/Schema';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SchemaESelect
    extends IEntitySelectProperties, SchemaEOptionalId {
	// Non-Id Properties
	scope?: string | IQStringField;
	name?: string | IQStringField;
	packageName?: string | IQStringField;
	status?: number | IQNumberField;
	lastIds?: LastIds | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	domain?: DomainESelect;
	versions?: SchemaVersionESelect;
	currentVersion?: SchemaCurrentVersionESelect;

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
	scope?: string | IQStringField;
	name?: string | IQStringField;
	packageName?: string | IQStringField;
	status?: number | IQNumberField;
	lastIds?: LastIds | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	domain?: DomainEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SchemaGraph
	extends SchemaEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	scope?: string | IQStringField;
	name?: string | IQStringField;
	packageName?: string | IQStringField;
	status?: number | IQNumberField;
	lastIds?: LastIds | IQStringField;

	// Relations
	domain?: DomainGraph;
	versions?: SchemaVersionGraph[];
	currentVersion?: SchemaCurrentVersionGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SchemaEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SCOPE?: string | IQStringField;
	SCHEMA_NAME?: string | IQStringField;
	PACKAGE_NAME?: string | IQStringField;
	STATUS?: number | IQNumberField;
	LAST_IDS?: string | IQStringField;
	DOMAIN_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SchemaECreateProperties
extends Partial<SchemaEId>, SchemaEUpdateProperties {
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
export interface QSchema extends IQEntity<Schema>
{
	// Id Fields
	index: IQNumberField;

	// Id Relations

	// Non-Id Fields
	scope: IQStringField;
	name: IQStringField;
	packageName: IQStringField;
	status: IQNumberField;
	lastIds: IQStringField;

	// Non-Id Relations
	domain: QDomainQRelation;
	versions: IQOneToManyRelation<SchemaVersion, QSchemaVersion>;
	currentVersion: IQOneToManyRelation<SchemaCurrentVersion, QSchemaCurrentVersion>;

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
	extends IQRelation<Schema, QSchema>, QSchemaQId {
}

