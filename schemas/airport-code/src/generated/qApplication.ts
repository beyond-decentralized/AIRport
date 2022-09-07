import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QSequence } from './qsequence';
import { QSystemWideOperationId } from './qsystemwideoperationid';
import { QTerminalRun } from './qterminalrun';
import {
  Sequence,
  SystemWideOperationId,
  TerminalRun
} from '../ddl/ddl';

export interface air____at_airport_slash_airport_dash_code_LocalQApp extends QApp {

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

export const Q_air____at_airport_slash_airport_dash_code: air____at_airport_slash_airport_dash_code_LocalQApp = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/airport-code'
};
export default Q_air____at_airport_slash_airport_dash_code

export function air____at_airport_slash_airport_dash_code_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_air____at_airport_slash_airport_dash_code.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_air____at_airport_slash_airport_dash_code)
