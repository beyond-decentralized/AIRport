import {ChangeRecord} from '@airport/terminal-map'

/**
 * Created by Papa on 6/28/2016.
 */

export interface IRecordStateData {
	accessed: { [fieldName: string]: boolean };
	current: { [fieldName: string]: any };
	initialized: { [fieldName: string]: boolean };
	original: { [fieldName: string]: any };
}

export class RecordStateData
	implements IRecordStateData {

	accessed: { [fieldName: string]: boolean }    = {}
	current: { [fieldName: string]: any }         = {}
	initialized: { [fieldName: string]: boolean } = {}
	original: { [fieldName: string]: any }        = {}

}

export enum CurrentState {
	CREATED,
	DELETED,
	UPDATED
}

export interface IRecordState {
	data: IRecordStateData;
	initialized: boolean;
	isDirty: boolean;
	proxied: boolean;

	create(): void;

	delete(): void;

	getChangeRecord(): ChangeRecord;

	update(): void;

	toJSON(): any;
}

export class RecordState
	implements IRecordState {

	currentState: CurrentState
	data        = new RecordStateData()
	initialized = false
	isDirty     = false
	proxied     = false

	create(): void {
		this.currentState = CurrentState.CREATED
	}

	delete(): void {
		this.currentState = CurrentState.DELETED
	}

	getChangeRecord(): ChangeRecord {
		return null
	}

	toJSON(): any {
		// TODO: implement
		return null
	}

	update(): void {
		this.currentState = CurrentState.UPDATED
	}
}
