import { QApplication } from '@airport/aviation-communication';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QClient } from './qclient';
import { QContinent } from './locality/qcontinent';
import { QCountry } from './locality/qcountry';
import { QMetroArea } from './locality/qmetroarea';
import { QMetroAreaState } from './locality/qmetroareastate';
import { QState } from './locality/qstate';
import { QTerminal } from './qterminal';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
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
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map