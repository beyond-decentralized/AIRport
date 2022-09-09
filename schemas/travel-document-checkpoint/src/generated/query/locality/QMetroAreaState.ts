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
	StateGraph,
	StateEId,
	StateEOptionalId,
	StateEUpdateProperties,
	StateESelect,
	QState,
	QStateQId,
	QStateQRelation,
} from './QState';
import {
	IState,
} from '../../entity/locality/IState';
import {
	MetroAreaGraph,
	MetroAreaEId,
	MetroAreaEOptionalId,
	MetroAreaEUpdateProperties,
	MetroAreaESelect,
	QMetroArea,
	QMetroAreaQId,
	QMetroAreaQRelation,
} from './QMetroArea';
import {
	IMetroArea,
} from '../../entity/locality/IMetroArea';
import {
	IMetroAreaState,
} from '../../entity/locality/IMetroAreaState';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MetroAreaStateESelect
    extends IEntitySelectProperties, MetroAreaStateEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	state?: StateESelect;
	metroArea?: MetroAreaESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MetroAreaStateEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	state: StateEId;
	metroArea: MetroAreaEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface MetroAreaStateEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	state?: StateEOptionalId;
	metroArea?: MetroAreaEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MetroAreaStateEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MetroAreaStateGraph
	extends MetroAreaStateEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	state?: StateGraph;
	metroArea?: MetroAreaGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MetroAreaStateEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MetroAreaStateECreateProperties
extends Partial<MetroAreaStateEId>, MetroAreaStateEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MetroAreaStateECreateColumns
extends MetroAreaStateEId, MetroAreaStateEUpdateColumns {
}


///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QMetroAreaState<IQE extends QMetroAreaState = any> extends IQEntity<IQE | QMetroAreaState>
{
	// Id Fields

	// Id Relations
	state: QStateQRelation;
	metroArea: QMetroAreaQRelation;

	// Non-Id Fields

	// Non-Id Relations

}

// Entity Id Interface
export interface QMetroAreaStateQId
{
	
	// Id Fields

	// Id Relations
	state: QStateQId;
	metroArea: QMetroAreaQId;


}

// Entity Relation Interface
export interface QMetroAreaStateQRelation
	extends IQRelation<QMetroAreaState>, QMetroAreaStateQId {
}