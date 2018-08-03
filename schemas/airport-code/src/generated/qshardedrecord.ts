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
	IShard,
	ShardEId,
	ShardEOptionalId,
	ShardEUpdateProperties,
	ShardESelect,
	QShard,
	QShardQId,
	QShardQRelation,
} from './qshard';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IShardedRecord {
	
	// Id Properties

	// Id Relations
	shard?: IShard;

	// Non-Id Properties

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
export interface ShardedRecordESelect
    extends IEntitySelectProperties, ShardedRecordEOptionalId, ShardedRecordEUpdateProperties {
	// Id Relations - full property interfaces
	shard?: ShardESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ShardedRecordEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	shard: ShardEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface ShardedRecordEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	shard?: ShardEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ShardedRecordEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ShardedRecordEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ShardedRecordECreateProperties
extends Partial<ShardedRecordEId>, ShardedRecordEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ShardedRecordECreateColumns
extends ShardedRecordEId, ShardedRecordEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QShardedRecord extends QEntity
{
	// Id Fields

	// Id Relations
	shard: QShardQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QShardedRecordQId
{
	
	// Id Fields

	// Id Relations
	shard: QShardQId;


}

// Entity Relation Interface
export interface QShardedRecordQRelation<SubType extends IQEntityInternal>
	extends QRelation<SubType>, QShardedRecordQId {
}

