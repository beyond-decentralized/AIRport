import {
	AIRPORT_DATABASE,
	QApplication as AirportQApplication
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DEPENDENCY_INJECTION}            from '@airport/direction-indicator'
import {
	DbApplication,
	EntityId,
	getFullApplicationName
}                      from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSystemWideOperationId } from './qsystemwideoperationid';
import { QTerminalRun } from './qterminalrun';
import {
  Sequence,
  SystemWideOperationId,
  TerminalRun
} from '../ddl/ddl';

export interface LocalQApplication extends AirportQApplication {

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
	return dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbApplication__, dbEntityId)
}

DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q
})
