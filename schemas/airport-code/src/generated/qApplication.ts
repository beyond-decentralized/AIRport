import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    EntityId,
}                      from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSystemWideOperationId } from './qsystemwideoperationid';
import { QTerminalRun } from './qterminalrun';
import {
  Sequence,
  SystemWideOperationId,
  TerminalRun
} from '../ddl/ddl';

export interface LocalQApplication extends QApplication {

    db: DbApplication;

  Sequence: QSequence;
	SystemWideOperationId: QSystemWideOperationId;
	TerminalRun: QTerminalRun;

}

const __constructors__ = {
	Sequence: Sequence,
	SystemWideOperationId: SystemWideOperationId,
	TerminalRun: TerminalRun
};

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/airport-code'
};
export const Q: LocalQApplication = Q_APPLICATION

export function diSet(
	dbEntityId: EntityId
): boolean {
	return airApi.dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return airApi.ddS(Q.__dbApplication__, dbEntityId)
}

airApi.setQApplication(Q_APPLICATION)
