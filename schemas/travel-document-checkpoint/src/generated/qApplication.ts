import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    EntityId,
}                      from '@airport/ground-control';
import { QClient } from './qclient';
import { QContinent } from './qcontinent';
import { QCountry } from './qcountry';
import { QTerminal } from './qterminal';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
import {
  Client,
  Continent,
  Country,
  Terminal,
  User,
  UserTerminal
} from '../ddl/ddl';

export interface LocalQApplication extends QApplication {

    db: DbApplication;

  Client: QClient;
	Continent: QContinent;
	Country: QCountry;
	Terminal: QTerminal;
	User: QUser;
	UserTerminal: QUserTerminal;

}

const __constructors__ = {
	Client: Client,
	Continent: Continent,
	Country: Country,
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
