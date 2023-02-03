import { DbApplication_Index } from "./DbApplication";
import { DbEntity_TableIndex } from "./DbEntity";
import { DbColumn_Index } from "./DbProperty";

export type SystemWideOperationId_Id = number;
/**
 * No actual records are inserted into this table, 
 * it is only used for the associated sequence
 */
export interface DbSystemWideOperationId {
	_localId: SystemWideOperationId_Id
}

export type SequenceIncrementBy = number
export type SequenceCurrentValue = number

export interface DbSequence {

	// Id Properties
	applicationIndex: DbApplication_Index
	entityIndex: DbEntity_TableIndex
	columnIndex: DbColumn_Index

	// Id Relations

	// Non-Id Properties
	incrementBy: SequenceIncrementBy
	currentValue: SequenceCurrentValue

	// Non-Id Relations

	// Transient Properties

	// Public Methods

}
