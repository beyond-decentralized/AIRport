import { QApplication as AirportQApplication } from '@airport/air-traffic-control';
import { DbApplication } from '@airport/ground-control';
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
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
//# sourceMappingURL=qApiApplication.d.ts.map