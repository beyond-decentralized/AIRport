import {DI}                     from '@airport/di'
import {MISSING_RECORD_CREATOR} from '../../../tokens'

export interface IMissingRecordCreator {

}

export class MissingRecordCreator
	implements IMissingRecordCreator {

	/*
	private missingRecordDao: IMissingRecordDao
*/

}

DI.set(MISSING_RECORD_CREATOR, MissingRecordCreator)
