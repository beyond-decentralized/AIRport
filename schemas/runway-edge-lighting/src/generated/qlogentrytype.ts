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
	IApplicationPackage,
	ApplicationPackageEId,
	ApplicationPackageEOptionalId,
	ApplicationPackageEUpdateProperties,
	ApplicationPackageESelect,
	QApplicationPackage,
	QApplicationPackageQId,
	QApplicationPackageQRelation,
	IPackagedUnit,
	PackagedUnitEId,
	PackagedUnitEOptionalId,
	PackagedUnitEUpdateProperties,
	PackagedUnitESelect,
	QPackagedUnit,
	QPackagedUnitQId,
	QPackagedUnitQRelation,
} from '@airport/territory';
import {
	ILogEntry,
	LogEntryEId,
	LogEntryEOptionalId,
	LogEntryEUpdateProperties,
	LogEntryESelect,
	QLogEntry,
	QLogEntryQId,
	QLogEntryQRelation,
} from './qlogentry';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILogEntryType {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	level?: number;
	text?: string;

	// Non-Id Relations
	applicationPackage?: IApplicationPackage;
	packagedUnit?: IPackagedUnit;
	logEntries?: ILogEntry[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryTypeESelect
    extends IEntitySelectProperties, LogEntryTypeEOptionalId, LogEntryTypeEUpdateProperties {
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
	level?: number | IQNumberField;
	text?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	applicationPackage?: ApplicationPackageEOptionalId;
	packagedUnit?: PackagedUnitEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryTypeEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	LEVEL?: number | IQNumberField;
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
export interface QLogEntryType extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	level: IQNumberField;
	text: IQStringField;

	// Non-Id Relations
	applicationPackage: QApplicationPackageQRelation;
	packagedUnit: QPackagedUnitQRelation;
	logEntries: IQOneToManyRelation<QLogEntry>;

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
	extends QRelation<QLogEntryType>, QLogEntryTypeQId {
}

