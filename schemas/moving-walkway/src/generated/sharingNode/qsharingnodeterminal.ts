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
	SharingNodeGraph,
	SharingNodeEId,
	SharingNodeEOptionalId,
	SharingNodeEUpdateProperties,
	SharingNodeESelect,
	QSharingNode,
	QSharingNodeQId,
	QSharingNodeQRelation,
} from './qsharingnode';
import {
	TerminalGraph,
	TerminalEId,
	TerminalEOptionalId,
	TerminalEUpdateProperties,
	TerminalESelect,
	QTerminal,
	QTerminalQId,
	QTerminalQRelation,
} from '@airport/travel-document-checkpoint';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeTerminalESelect
    extends IEntitySelectProperties, SharingNodeTerminalEOptionalId {
	// Non-Id Properties
	agtTerminalId?: number | IQNumberField;
	agtTerminalPassword?: string | IQStringField;
	terminalSyncStatus?: number | IQNumberField;

	// Id Relations - full property interfaces
	sharingNode?: SharingNodeESelect;
	terminal?: TerminalESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeTerminalEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	sharingNode: SharingNodeEId;
	terminal: TerminalEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeTerminalEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	sharingNode?: SharingNodeEOptionalId;
	terminal?: TerminalEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeTerminalEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	agtTerminalId?: number | IQNumberField;
	agtTerminalPassword?: string | IQStringField;
	terminalSyncStatus?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeTerminalGraph
	extends IEntitySelectProperties, SharingNodeTerminalEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	agtTerminalId?: number | IQNumberField;
	agtTerminalPassword?: string | IQStringField;
	terminalSyncStatus?: number | IQNumberField;

	// Relations
	sharingNode?: SharingNodeGraph;
	terminal?: TerminalGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeTerminalEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	AGT_TERMINAL_ID?: number | IQNumberField;
	TERMINAL_PASSWORD?: string | IQStringField;
	TERMINAL_SYNC_STATUS?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeTerminalECreateProperties
extends Partial<SharingNodeTerminalEId>, SharingNodeTerminalEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeTerminalECreateColumns
extends SharingNodeTerminalEId, SharingNodeTerminalEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeTerminal extends IQEntity
{
	// Id Fields

	// Id Relations
	sharingNode: QSharingNodeQRelation;
	terminal: QTerminalQRelation;

	// Non-Id Fields
	agtTerminalId: IQNumberField;
	agtTerminalPassword: IQStringField;
	terminalSyncStatus: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSharingNodeTerminalQId
{
	
	// Id Fields

	// Id Relations
	sharingNode: QSharingNodeQId;
	terminal: QTerminalQId;


}

// Entity Relation Interface
export interface QSharingNodeTerminalQRelation
	extends IQRelation<QSharingNodeTerminal>, QSharingNodeTerminalQId {
}

