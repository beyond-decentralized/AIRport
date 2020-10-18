import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	DailyArchiveLogGraph,
	DailyArchiveLogEId,
	DailyArchiveLogEOptionalId,
	DailyArchiveLogEUpdateProperties,
	DailyArchiveLogESelect,
	QDailyArchiveLog,
	QDailyArchiveLogQId,
	QDailyArchiveLogQRelation,
} from './qdailyarchivelog';
import {
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from '../terminal/qterminal';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface DailyTerminalSyncLogESelect
    extends IEntitySelectProperties, DailyTerminalSyncLogEOptionalId {
	// Non-Id Properties
	acknowledged?: number | IQNumberField;

	// Id Relations - full property interfaces
	dailyArchiveLog?: DailyArchiveLogESelect;
	terminal?: TerminalESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailyTerminalSyncLogEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	dailyArchiveLog: DailyArchiveLogEId;
	terminal: TerminalEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface DailyTerminalSyncLogEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	dailyArchiveLog?: DailyArchiveLogEOptionalId;
	terminal?: TerminalEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailyTerminalSyncLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	acknowledged?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DailyTerminalSyncLogGraph
	extends IEntitySelectProperties, DailyTerminalSyncLogEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	acknowledged?: number | IQNumberField;

	// Relations
	dailyArchiveLog?: DailyArchiveLogGraph;
	terminal?: TerminalGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface DailyTerminalSyncLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACKNOWLEDGED?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailyTerminalSyncLogECreateProperties
extends Partial<DailyTerminalSyncLogEId>, DailyTerminalSyncLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailyTerminalSyncLogECreateColumns
extends DailyTerminalSyncLogEId, DailyTerminalSyncLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailyTerminalSyncLog extends IQEntity
{
	// Id Fields

	// Id Relations
	dailyArchiveLog: QDailyArchiveLogQRelation;
	terminal: QTerminalQRelation;

	// Non-Id Fields
	acknowledged: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QDailyTerminalSyncLogQId
{
	
	// Id Fields

	// Id Relations
	dailyArchiveLog: QDailyArchiveLogQId;
	terminal: QTerminalQId;


}

// Entity Relation Interface
export interface QDailyTerminalSyncLogQRelation
	extends IQRelation<QDailyTerminalSyncLog>, QDailyTerminalSyncLogQId {
}

