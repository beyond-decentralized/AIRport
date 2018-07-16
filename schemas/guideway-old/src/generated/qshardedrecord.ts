import {
	IQEntityInternal,
	IEntityIdProperties,
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
	ShardEUpdate,
	ShardESelect,
	QShard,
	QShardQId,
	QShardQRelation,
} from '@airport/airport-code';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IShardedRecord {
	
	// Id Properties

	// Id Relations
	shard?: IShard;
	originalShard?: IShard;

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
    extends IEntitySelectProperties, ShardedRecordEOptionalId, ShardedRecordEUpdate {
	// Id Relations - full property interfaces
	shard?: ShardESelect;
	originalShard?: ShardESelect;

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
	originalShard: ShardEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface ShardedRecordEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	shard?: ShardEOptionalId;
	originalShard?: ShardEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ShardedRecordEUpdate
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ShardedRecordECreate
extends ShardedRecordEId, ShardedRecordEUpdate {
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
	originalShard: QShardQRelation;

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QShardedRecordQId
{
	
	// Id Fields

	// Id Relations
	shard: QShardQId;
	originalShard: QShardQId;


}

// Entity Relation Interface
export interface QShardedRecordQRelation<SubType extends IQEntityInternal>
	extends QRelation<SubType>, QShardedRecordQId {
}

