import {TableIndex}             from '@airport/air-control'
import {DI}                     from '@airport/di'
import {
	IMissingRecordDao,
	MISSING_RECORD_DAO
}                               from '@airport/moving-walkway'
import {MISSING_RECORD_CREATOR} from '../../../diTokens'

export interface IMissingRecordCreator {

}

export class MissingRecordCreator
	implements IMissingRecordCreator {

	private missingRecordDao: IMissingRecordDao

	constructor() {
		DI.get((
			missingRecordDao
		) => {
			this.missingRecordDao = missingRecordDao
		}, MISSING_RECORD_DAO)
	}

}

DI.set(MISSING_RECORD_CREATOR, MissingRecordCreator)
