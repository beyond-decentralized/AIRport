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
	SystemGeneratedGraph,
	SystemGeneratedEId,
	SystemGeneratedEUpdateColumns,
	SystemGeneratedEUpdateProperties,
	SystemGeneratedESelect,
	QSystemGeneratedQId,
	QSystemGeneratedQRelation,
	QSystemGenerated,
} from './attributes/qsystemgenerated';
import {
	TranslationType,
} from '../ddl/TranslationType';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TranslationTypeESelect
    extends SystemGeneratedESelect, TranslationTypeEOptionalId {
	// Non-Id Properties
	code?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TranslationTypeEId
    extends SystemGeneratedEId {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TranslationTypeEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TranslationTypeEUpdateProperties
	extends SystemGeneratedEUpdateProperties {
	// Non-Id Properties
	code?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TranslationTypeGraph
	extends TranslationTypeEOptionalId, SystemGeneratedGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	code?: string | IQStringField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TranslationTypeEUpdateColumns
	extends SystemGeneratedEUpdateColumns {
	// Non-Id Columns
	CREATED_AT?: Date | IQDateField;
	TRANSLATION_TYPE_CODE?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TranslationTypeECreateProperties
extends Partial<TranslationTypeEId>, TranslationTypeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TranslationTypeECreateColumns
extends TranslationTypeEId, TranslationTypeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTranslationType extends QSystemGenerated<TranslationType>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	code: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QTranslationTypeQId extends QSystemGeneratedQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QTranslationTypeQRelation
	extends QSystemGeneratedQRelation<TranslationType, QTranslationType>, QTranslationTypeQId {
}

