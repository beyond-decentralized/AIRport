import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QRecordUpdateStage } from './qrecordupdatestage';
import { QSynchronizationConflict } from './conflict/qsynchronizationconflict';
import { QSynchronizationConflictValues } from './conflict/qsynchronizationconflictvalues';
import {
  RecordUpdateStage,
  SynchronizationConflict,
  SynchronizationConflictValues
} from '../ddl/ddl';

export interface LocalQApplication extends QApplication {

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
  name: '@airport/layover'
};
export const Q: LocalQApplication = Q_APPLICATION

export function diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.ddS(Q.__dbApplication__, dbEntityId)
}

airApi.setQApplication(Q_APPLICATION)
