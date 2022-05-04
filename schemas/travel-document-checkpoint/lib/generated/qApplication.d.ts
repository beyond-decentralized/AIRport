import { QApplication as AirportQApplication } from '@airport/air-traffic-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QAgt } from './qagt';
import { QContinent } from './qcontinent';
import { QCountry } from './qcountry';
import { QTerminal } from './qterminal';
import { QTerminalAgt } from './qterminalagt';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
import { QUserTerminalAgt } from './quserterminalagt';
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
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map