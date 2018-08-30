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
	IServerSyncLog,
	ServerSyncLogEId,
	ServerSyncLogEOptionalId,
	ServerSyncLogEUpdateProperties,
	ServerSyncLogESelect,
	QServerSyncLog,
	QServerSyncLogQId,
	QServerSyncLogQRelation,
} from './qserversynclog';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IServer {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	serverType?: number;

	// Non-Id Relations
	serverSyncLogs?: IServerSyncLog[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ServerESelect
    extends IEntitySelectProperties, ServerEOptionalId {
	// Non-Id Properties
	serverType?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	serverSyncLogs?: ServerSyncLogESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ServerEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ServerEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ServerEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	serverType?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ServerEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SERVER_TYPE?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ServerECreateProperties
extends Partial<ServerEId>, ServerEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ServerECreateColumns
extends ServerEId, ServerEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QServer extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	serverType: IQNumberField;

	// Non-Id Relations
	serverSyncLogs: IQOneToManyRelation<QServerSyncLog>;

}


// Entity Id Interface
export interface QServerQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QServerQRelation
	extends QRelation<QServer>, QServerQId {
}

