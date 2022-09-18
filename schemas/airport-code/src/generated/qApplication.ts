import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QSequence } from './query/QSequence';
import { QSystemWideOperationId } from './query/QSystemWideOperationId';
import { QTerminalRun } from './query/QTerminalRun';
import {
  Sequence,
  SystemWideOperationId,
  TerminalRun
} from '../ddl/ddl';

export interface airport____at_airport_slash_airport_dash_code_LocalQApp extends QApp {

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

export const Q_airport____at_airport_slash_airport_dash_code: airport____at_airport_slash_airport_dash_code_LocalQApp = <any>{
	__constructors__,
  domain: 'airport',
  name: '@airport/airport-code'
};
export default Q_airport____at_airport_slash_airport_dash_code

export function airport____at_airport_slash_airport_dash_code_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_airport____at_airport_slash_airport_dash_code.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_airport____at_airport_slash_airport_dash_code)
