import {
	AIRPORT_DATABASE,
	QApplication as AirportQApplication
}                      from '@airport/air-control'
import {DI}            from '@airport/di'
import {
	DbApplication,
	getFullApplicationName
}                      from '@airport/ground-control';
import { QAgt } from '../generated/qagt';
import { QContinent } from '../generated/qcontinent';
import { QCountry } from '../generated/qcountry';
import { QTerminal } from '../generated/qterminal';
import { QTerminalAgt } from '../generated/qterminalagt';
import { QUser } from '../generated/quser';
import { QUserTerminal } from '../generated/quserterminal';
import { QUserTerminalAgt } from '../generated/quserterminalagt';

export interface LocalQApplication extends AirportQApplication {

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
};

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/travel-document-checkpoint'
};
export const Q: LocalQApplication = Q_APPLICATION

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q
})
