import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';

// import {

// } from '../ddl/ddl';

export interface airport____at_airport_slash_session_dash_state_LocalQApp extends QApp {

    db: DbApplication;

  

}

const __constructors__ = {
	
};

export const Q_airport____at_airport_slash_session_dash_state: airport____at_airport_slash_session_dash_state_LocalQApp = <any>{
	__constructors__,
  domain: 'airport',
  name: '@airport/session-state'
};
export default Q_airport____at_airport_slash_session_dash_state

export function airport____at_airport_slash_session_dash_state_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_airport____at_airport_slash_session_dash_state.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_airport____at_airport_slash_session_dash_state)
