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
	IActor,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from './qactor';
import {
	IApplication,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
} from './qapplication';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IActorApplication {
	
	// Id Properties
	id?: number;

	// Id Relations
	actor?: IActor;

	// Non-Id Properties

	// Non-Id Relations
	application?: IApplication;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorApplicationESelect
    extends IEntitySelectProperties, ActorApplicationEOptionalId, ActorApplicationEUpdateProperties {
	// Id Relations - full property interfaces
	actor?: ActorESelect;

  // Non-Id relations (including OneToMany's)
	application?: ApplicationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorApplicationEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	actor: ActorEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface ActorApplicationEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	actor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorApplicationEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	application?: ApplicationEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorApplicationEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	APPLICATION_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ActorApplicationECreateProperties
extends Partial<ActorApplicationEId>, ActorApplicationEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ActorApplicationECreateColumns
extends ActorApplicationEId, ActorApplicationEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QActorApplication extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	actor: QActorQRelation;

	// Non-Id Fields

	// Non-Id Relations
	application: QApplicationQRelation;

}


// Entity Id Interface
export interface QActorApplicationQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	actor: QActorQId;


}

// Entity Relation Interface
export interface QActorApplicationQRelation
	extends QRelation<QActorApplication>, QActorApplicationQId {
}

