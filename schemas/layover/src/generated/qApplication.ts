import {
    airApi,
    QApp
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

export interface air____at_airport_slash_layover_LocalQApp extends QApp {

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

export const Q_air____at_airport_slash_layover: air____at_airport_slash_layover_LocalQApp = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/layover'
};
export default Q_air____at_airport_slash_layover

export function air____at_airport_slash_layover_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_air____at_airport_slash_layover.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_air____at_airport_slash_layover)
