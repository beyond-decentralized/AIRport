import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    EntityId,
}                      from '@airport/ground-control';
import { QAgt } from './qagt';
import { QContinent } from './qcontinent';
import { QCountry } from './qcountry';
import { QTerminal } from './qterminal';
import { QTerminalAgt } from './qterminalagt';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
import { QUserTerminalAgt } from './quserterminalagt';
import {
  Agt,
  Continent,
  Country,
  Terminal,
  TerminalAgt,
  User,
  UserTerminal,
  UserTerminalAgt
} from '../ddl/ddl';

export interface LocalQApplication extends QApplication {

    db: DbApplication;

  Agt: QAgt;
	Continent: QContinent;
	Country: QCountry;
	Terminal: QTerminal;
	TerminalAgt: QTerminalAgt;
	User: QUser;
	UserTerminal: QUserTerminal;
	UserTerminalAgt: QUserTerminalAgt;

}

const __constructors__ = {
	Agt: Agt,
	Continent: Continent,
	Country: Country,
	Terminal: Terminal,
	TerminalAgt: TerminalAgt,
	User: User,
	UserTerminal: UserTerminal,
	UserTerminalAgt: UserTerminalAgt
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
