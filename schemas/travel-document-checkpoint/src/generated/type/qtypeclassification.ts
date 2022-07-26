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
	ClassificationGraph,
	ClassificationEId,
	ClassificationEOptionalId,
	ClassificationEUpdateProperties,
	ClassificationESelect,
	QClassification,
	QClassificationQId,
	QClassificationQRelation,
} from './qclassification';
import {
	IClassification,
} from './classification';
import {
	TypeGraph,
	TypeEId,
	TypeEOptionalId,
	TypeEUpdateProperties,
	TypeESelect,
	QType,
	QTypeQId,
	QTypeQRelation,
} from './qtype';
import {
	IType,
} from './type';
import {
	ITypeClassification,
} from './typeclassification';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TypeClassificationESelect
    extends IEntitySelectProperties, TypeClassificationEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	classification?: ClassificationESelect;
	type?: TypeESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TypeClassificationEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	classification: ClassificationEId;
	type: TypeEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface TypeClassificationEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	classification?: ClassificationEOptionalId;
	type?: TypeEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TypeClassificationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TypeClassificationGraph
	extends TypeClassificationEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	classification?: ClassificationGraph;
	type?: TypeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TypeClassificationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TypeClassificationECreateProperties
extends Partial<TypeClassificationEId>, TypeClassificationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TypeClassificationECreateColumns
extends TypeClassificationEId, TypeClassificationEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QTypeClassification extends IQEntity
{
	// Id Fields

	// Id Relations
	classification: QClassificationQRelation;
	type: QTypeQRelation;

	// Non-Id Fields

	// Non-Id Relations

}

// Entity Id Interface
export interface QTypeClassificationQId
{
	
	// Id Fields

	// Id Relations
	classification: QClassificationQId;
	type: QTypeQId;


}

// Entity Relation Interface
export interface QTypeClassificationQRelation
	extends IQRelation<QTypeClassification>, QTypeClassificationQId {
}