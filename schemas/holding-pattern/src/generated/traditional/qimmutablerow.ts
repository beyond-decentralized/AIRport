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
	IStageable,
	StageableEId,
	StageableEUpdateColumns,
	StageableEUpdateProperties,
	StageableESelect,
	QStageableQId,
	QStageableQRelation,
	QStageable,
} from '../infrastructure/qstageable';
import {
	IUser,
	UserEId,
	UserEOptionalId,
	UserEUpdateProperties,
	UserESelect,
	QUser,
	QUserQId,
	QUserQRelation,
} from '@airport/travel-document-checkpoint';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IImmutableRow extends IStageable {
	
	// Id Properties

	// Id Relations

	// Non-Id Properties
	createdAt?: Date;

	// Non-Id Relations
	user?: IUser;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRowESelect
    extends StageableESelect, ImmutableRowEOptionalId {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	user?: UserESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRowEId
    extends StageableEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableRowEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableRowEUpdateProperties
	extends StageableEUpdateProperties {
	// Non-Id Properties
	createdAt?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's
	user?: UserEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableRowEUpdateColumns
	extends StageableEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableRowECreateProperties
extends Partial<ImmutableRowEId>, ImmutableRowEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableRowECreateColumns
extends ImmutableRowEId, ImmutableRowEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableRow extends QStageable
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	createdAt: IQDateField;

	// Non-Id Relations
	user: QUserQRelation;

}


// Entity Id Interface
export interface QImmutableRowQId extends QStageableQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QImmutableRowQRelation<SubType extends IQEntityInternal>
	extends QStageableQRelation<QImmutableRow>, QImmutableRowQId {
}

