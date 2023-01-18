import { Application_Index } from "./Application";
import { ApplicationEntity_TableIndex } from "./Entity";
import { ApplicationColumn_Index } from "./Property";

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
