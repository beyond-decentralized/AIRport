/**
 * Created by Papa on 1/7/2016.
 */

export interface ChangeRecord {
	[property:string]:any;
}

export interface ChangeError {
	fatal:boolean;
	message:string;
}

export interface ChangeRecordIterator {

	next():ChangeRecord;
	hasNext():boolean;

}