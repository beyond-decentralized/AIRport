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
	ISharingMessage,
	SharingMessageEId,
	SharingMessageEOptionalId,
	SharingMessageEUpdateProperties,
	SharingMessageESelect,
	QSharingMessage,
	QSharingMessageQId,
	QSharingMessageQRelation,
} from './qsharingmessage';
import {
	ISchema,
	SchemaEId,
	SchemaEOptionalId,
	SchemaEUpdateProperties,
	SchemaESelect,
	QSchema,
	QSchemaQId,
	QSchemaQRelation,
} from '@airport/traffic-pattern';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISharingMessageSchemasToChange {
	
	// Id Properties

	// Id Relations
	sharingMessage?: ISharingMessage;
	schema?: ISchema;

	// Non-Id Properties
	status?: number;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingMessageSchemasToChangeESelect
    extends IEntitySelectProperties, SharingMessageSchemasToChangeEOptionalId, SharingMessageSchemasToChangeEUpdateProperties {
	// Id Relations - full property interfaces
	sharingMessage?: SharingMessageESelect;
	schema?: SchemaESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingMessageSchemasToChangeEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	sharingMessage: SharingMessageEId;
	schema: SchemaEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingMessageSchemasToChangeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	sharingMessage?: SharingMessageEOptionalId;
	schema?: SchemaEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingMessageSchemasToChangeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	status?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingMessageSchemasToChangeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingMessageSchemasToChangeECreateProperties
extends SharingMessageSchemasToChangeEId, SharingMessageSchemasToChangeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingMessageSchemasToChangeECreateColumns
extends SharingMessageSchemasToChangeEId, SharingMessageSchemasToChangeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingMessageSchemasToChange extends QEntity
{
	// Id Fields

	// Id Relations
	sharingMessage: QSharingMessageQRelation;
	schema: QSchemaQRelation;

	// Non-Id Fields
	status: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSharingMessageSchemasToChangeQId
{
	
	// Id Fields

	// Id Relations
	sharingMessage: QSharingMessageQId;
	schema: QSchemaQId;


}

// Entity Relation Interface
export interface QSharingMessageSchemasToChangeQRelation
	extends QRelation<QSharingMessageSchemasToChange>, QSharingMessageSchemasToChangeQId {
}

