import {
	AIRPORT_DATABASE,
	QApplication as AirportQApplication
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbApplication,
	EntityId,
	getFullApplicationName
}                      from '@airport/ground-control';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
import {
  RecordUpdateStage,
  SynchronizationConflict,
  SynchronizationConflictValues
} from '../ddl/ddl';

export interface LocalQApplication extends AirportQApplication {

  db: DbApplication;

	RecordUpdateStage: QRecordUpdateStage;
	SynchronizationConflict: QSynchronizationConflict;
	SynchronizationConflictValues: QSynchronizationConflictValues;

}

const __constructors__ = {
	RecordUpdateStage: RecordUpdateStage,
	SynchronizationConflict: SynchronizationConflict,
	SynchronizationConflictValues: SynchronizationConflictValues
};

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/moving-walkway'
};
export const Q: LocalQApplication = Q_APPLICATION

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbApplication__, dbEntityId)
}

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q
})
