import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QRecordUpdateStage } from './query/QRecordUpdateStage';
import { QSynchronizationConflict } from './query/conflict/QSynchronizationConflict';
import { QSynchronizationConflictValues } from './query/conflict/QSynchronizationConflictValues';
import {
  RecordUpdateStage,
  SynchronizationConflict,
  SynchronizationConflictValues
} from '../ddl/ddl';

export interface airport____at_airport_slash_layover_LocalQApp extends QApp {

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

export const Q_airport____at_airport_slash_layover: airport____at_airport_slash_layover_LocalQApp = <any>{
	__constructors__,
  domain: 'airport',
  name: '@airport/layover'
};
export default Q_airport____at_airport_slash_layover

export function airport____at_airport_slash_layover_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_airport____at_airport_slash_layover.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_airport____at_airport_slash_layover)
