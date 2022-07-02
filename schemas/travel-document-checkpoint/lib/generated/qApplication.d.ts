import { QApplication } from '@airport/aviation-communication';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QClient } from './client/qclient';
import { QClientType } from './client/qclienttype';
import { QContinent } from './locality/qcontinent';
import { QCountry } from './locality/qcountry';
import { QMetroArea } from './locality/qmetroarea';
import { QMetroAreaState } from './locality/qmetroareastate';
import { QState } from './locality/qstate';
import { QTerminal } from './terminal/qterminal';
import { QTerminalType } from './terminal/qterminaltype';
import { QUser } from './quser';
import { QUserTerminal } from './terminal/quserterminal';
export interface LocalQApplication extends QApplication {
    db: DbApplication;
    Client: QClient;
    ClientType: QClientType;
    Continent: QContinent;
    Country: QCountry;
    MetroArea: QMetroArea;
    MetroAreaState: QMetroAreaState;
    State: QState;
    Terminal: QTerminal;
    TerminalType: QTerminalType;
    User: QUser;
    UserTerminal: QUserTerminal;
}
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map