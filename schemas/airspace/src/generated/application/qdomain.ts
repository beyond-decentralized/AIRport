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
	ApplicationGraph,
	ApplicationEId,
	ApplicationEOptionalId,
	ApplicationEUpdateProperties,
	ApplicationESelect,
	QApplication,
	QApplicationQId,
	QApplicationQRelation,
} from './qapplication';
import {
	IApplication,
} from './application';
import {
	IDomain,
} from './domain';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DomainESelect
    extends IEntitySelectProperties, DomainEOptionalId {
	// Non-Id Properties
	name?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applications?: ApplicationESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DomainEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface DomainEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DomainEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	name?: string | IQStringField;

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DomainGraph
	extends DomainEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	name?: string | IQStringField;

	// Relations
	applications?: ApplicationGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DomainEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NAME?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DomainECreateProperties
extends Partial<DomainEId>, DomainEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DomainECreateColumns
extends DomainEId, DomainEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QDomain extends IQEntity
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	name: IQStringField;

	// Non-Id Relations
	applications: IQOneToManyRelation<QApplication>;

}

// Entity Id Interface
export interface QDomainQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QDomainQRelation
	extends IQRelation<QDomain>, QDomainQId {
}