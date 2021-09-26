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
	ApplicationPackageGraph,
	ApplicationPackageEId,
	ApplicationPackageEOptionalId,
	ApplicationPackageEUpdateProperties,
	ApplicationPackageESelect,
	QApplicationPackage,
	QApplicationPackageQId,
	QApplicationPackageQRelation,
	ApplicationPackage,
	PackagedUnitGraph,
	PackagedUnitEId,
	PackagedUnitEOptionalId,
	PackagedUnitEUpdateProperties,
	PackagedUnitESelect,
	QPackagedUnit,
	QPackagedUnitQId,
	QPackagedUnitQRelation,
	PackagedUnit,
} from '@airport/territory';
import {
	LogEntryGraph,
	LogEntryEId,
	LogEntryEOptionalId,
	LogEntryEUpdateProperties,
	LogEntryESelect,
	QLogEntry,
	QLogEntryQId,
	QLogEntryQRelation,
} from './qlogentry';
import {
	LogEntry,
} from '../ddl/LogEntry';
import {
	LogEntryType,
} from '../ddl/LogEntryType';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryTypeESelect
    extends IEntitySelectProperties, LogEntryTypeEOptionalId {
	// Non-Id Properties
	level?: string | IQStringField;
	text?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applicationPackage?: ApplicationPackageESelect;
	packagedUnit?: PackagedUnitESelect;
	logEntries?: LogEntryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEntryTypeEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface LogEntryTypeEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEntryTypeEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	level?: string | IQStringField;
	text?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	applicationPackage?: ApplicationPackageEOptionalId;
	packagedUnit?: PackagedUnitEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LogEntryTypeGraph
	extends LogEntryTypeEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	level?: string | IQStringField;
	text?: string | IQStringField;

	// Relations
	applicationPackage?: ApplicationPackageGraph;
	packagedUnit?: PackagedUnitGraph;
	logEntries?: LogEntryGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryTypeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	LEVEL?: string | IQStringField;
	TEXT?: string | IQStringField;
	APPLICATION_PACKAGE_ID?: number | IQNumberField;
	PACKAGED_UNIT_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogEntryTypeECreateProperties
extends Partial<LogEntryTypeEId>, LogEntryTypeEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogEntryTypeECreateColumns
extends LogEntryTypeEId, LogEntryTypeEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLogEntryType extends IQEntity<LogEntryType>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	level: IQStringField;
	text: IQStringField;

	// Non-Id Relations
	applicationPackage: QApplicationPackageQRelation;
	packagedUnit: QPackagedUnitQRelation;
	logEntries: IQOneToManyRelation<LogEntry, QLogEntry>;

}


// Entity Id Interface
export interface QLogEntryTypeQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QLogEntryTypeQRelation
	extends IQRelation<LogEntryType, QLogEntryType>, QLogEntryTypeQId {
}

