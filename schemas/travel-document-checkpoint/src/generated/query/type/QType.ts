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
	TypeClassificationGraph,
	TypeClassificationEId,
	TypeClassificationEOptionalId,
	TypeClassificationEUpdateProperties,
	TypeClassificationESelect,
	QTypeClassification,
	QTypeClassificationQId,
	QTypeClassificationQRelation,
} from './QTypeClassification';
import {
	ITypeClassification,
} from '../../entity/type/ITypeClassification';
import {
	IType,
} from '../../entity/type/IType';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TypeESelect
    extends IEntitySelectProperties, TypeEOptionalId {
	// Non-Id Properties
	name?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	typeClassifications?: TypeClassificationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TypeEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TypeEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TypeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TypeGraph
	extends TypeEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	name?: string | IQStringField;

	// Relations
	typeClassifications?: TypeClassificationGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TypeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TypeECreateProperties
extends Partial<TypeEId>, TypeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TypeECreateColumns
extends TypeEId, TypeEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QType<IQE extends QType = any> extends IQEntity<IQE | QType>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;

	// Non-Id Relations
	typeClassifications: IQOneToManyRelation<QTypeClassification>;

}

// Entity Id Interface
export interface QTypeQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QTypeQRelation
	extends IQRelation<QType>, QTypeQId {
}