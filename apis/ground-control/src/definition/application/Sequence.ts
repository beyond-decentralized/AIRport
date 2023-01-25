import { Application_Index } from "./Application";
import { ApplicationEntity_TableIndex } from "./Entity";
import { ApplicationColumn_Index } from "./Property";

export type SystemWideOperationId_Id = number;
/**
 * No actual records are inserted into this table, 
 * it is only used for the associated sequence
 */
export interface ISystemWideOperationId {
	_localId: SystemWideOperationId_Id
}

export type SequenceIncrementBy = number
export type SequenceCurrentValue = number

export interface DbSequence {

	// Id Properties
	applicationIndex: Application_Index
	tableIndex?: ApplicationEntity_TableIndex
	columnIndex?: ApplicationColumn_Index

	// Id Relations

	// Non-Id Properties
	incrementBy?: SequenceIncrementBy
	currentValue?: SequenceCurrentValue

	// Non-Id Relations

	// Transient Properties

	// Public Methods

}
