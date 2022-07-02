import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    EntityId,
}                      from '@airport/ground-control';
import { QClient } from './qclient';
import { QContinent } from './locality/qcontinent';
import { QCountry } from './locality/qcountry';
import { QMetroArea } from './locality/qmetroarea';
import { QMetroAreaState } from './locality/qmetroareastate';
import { QState } from './locality/qstate';
import { QTerminal } from './qterminal';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
import {
  Client,
  Continent,
  Country,
  MetroArea,
  MetroAreaState,
  State,
  Terminal,
  User,
  UserTerminal
} from '../ddl/ddl';

export interface LocalQApplication extends QApplication {

    db: DbApplication;

  Client: QClient;
	Continent: QContinent;
	Country: QCountry;
	MetroArea: QMetroArea;
	MetroAreaState: QMetroAreaState;
	State: QState;
	Terminal: QTerminal;
	User: QUser;
	UserTerminal: QUserTerminal;

}

const __constructors__ = {
	Client: Client,
	Continent: Continent,
	Country: Country,
	MetroArea: MetroArea,
	MetroAreaState: MetroAreaState,
	State: State,
	Terminal: Terminal,
	User: User,
	UserTerminal: UserTerminal
};

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/travel-document-checkpoint'
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
