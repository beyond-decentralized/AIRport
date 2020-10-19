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
	MonthlyArchiveLogGraph,
	MonthlyArchiveLogEId,
	MonthlyArchiveLogEOptionalId,
	MonthlyArchiveLogEUpdateProperties,
	MonthlyArchiveLogESelect,
	QMonthlyArchiveLog,
	QMonthlyArchiveLogQId,
	QMonthlyArchiveLogQRelation,
} from './qmonthlyarchivelog';
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
export interface MonthlyTerminalSyncLogESelect
    extends IEntitySelectProperties, MonthlyTerminalSyncLogEOptionalId {
	// Non-Id Properties
	allAcknowledged?: boolean | IQBooleanField;
	dailySyncStatuses?: string | IQStringField;

	// Id Relations - full property interfaces
	monthlyArchiveLog?: MonthlyArchiveLogESelect;
	terminal?: TerminalESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MonthlyTerminalSyncLogEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	monthlyArchiveLog: MonthlyArchiveLogEId;
	terminal: TerminalEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface MonthlyTerminalSyncLogEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	monthlyArchiveLog?: MonthlyArchiveLogEOptionalId;
	terminal?: TerminalEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MonthlyTerminalSyncLogEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	allAcknowledged?: boolean | IQBooleanField;
	dailySyncStatuses?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MonthlyTerminalSyncLogGraph
	extends MonthlyTerminalSyncLogEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	allAcknowledged?: boolean | IQBooleanField;
	dailySyncStatuses?: string | IQStringField;

	// Relations
	monthlyArchiveLog?: MonthlyArchiveLogGraph;
	terminal?: TerminalGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MonthlyTerminalSyncLogEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ALL_ACKNOWLEDGED?: boolean | IQBooleanField;
	DAILY_SYNC_STATUSES?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MonthlyTerminalSyncLogECreateProperties
extends Partial<MonthlyTerminalSyncLogEId>, MonthlyTerminalSyncLogEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MonthlyTerminalSyncLogECreateColumns
extends MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMonthlyTerminalSyncLog extends IQEntity
{
	// Id Fields

	// Id Relations
	monthlyArchiveLog: QMonthlyArchiveLogQRelation;
	terminal: QTerminalQRelation;

	// Non-Id Fields
	allAcknowledged: IQBooleanField;
	dailySyncStatuses: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QMonthlyTerminalSyncLogQId
{
	
	// Id Fields

	// Id Relations
	monthlyArchiveLog: QMonthlyArchiveLogQId;
	terminal: QTerminalQId;


}

// Entity Relation Interface
export interface QMonthlyTerminalSyncLogQRelation
	extends IQRelation<QMonthlyTerminalSyncLog>, QMonthlyTerminalSyncLogQId {
}

