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
	ClientGraph,
	ClientEId,
	ClientEOptionalId,
	ClientEUpdateProperties,
	ClientESelect,
	QClient,
	QClientQId,
	QClientQRelation,
} from './qclient';
import {
	IClient,
} from './client';
import {
	TypeGraph,
	TypeEId,
	TypeEOptionalId,
	TypeEUpdateProperties,
	TypeESelect,
	QType,
	QTypeQId,
	QTypeQRelation,
} from '../type/qtype';
import {
	IType,
} from '../type/type';
import {
	IClientType,
} from './clienttype';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ClientTypeESelect
	extends IEntitySelectProperties, ClientTypeEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	client?: ClientESelect;
	type?: TypeESelect;

	// Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClientTypeEId
	extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	client: ClientEId;
	type: TypeEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface ClientTypeEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	client?: ClientEOptionalId;
	type?: TypeEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ClientTypeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ClientTypeGraph
	extends ClientTypeEOptionalId, IEntityCascadeGraph {
	// NOT USED: Cascading Relations
	// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	client?: ClientGraph;
	type?: TypeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ClientTypeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ClientTypeECreateProperties
	extends Partial<ClientTypeEId>, ClientTypeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ClientTypeECreateColumns
	extends ClientTypeEId, ClientTypeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QClientType extends IQEntity {
	// Id Fields

	// Id Relations
	client: QClientQRelation;
	type: QTypeQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QClientTypeQId {

	// Id Fields

	// Id Relations
	client: QClientQId;
	type: QTypeQId;


}

// Entity Relation Interface
export interface QClientTypeQRelation
	extends IQRelation<QClientType>, QClientTypeQId {
}

