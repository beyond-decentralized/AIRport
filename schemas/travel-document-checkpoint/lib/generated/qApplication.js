import { airApi } from '@airport/aviation-communication';
import { Classification, Client, ClientType, Continent, Country, Database, DatabaseType, MetroArea, MetroAreaState, State, Terminal, TerminalType, Type, TypeClassification, UserAccount } from '../ddl/ddl';
const __constructors__ = {
    Classification: Classification,
    Client: Client,
    ClientType: ClientType,
    Continent: Continent,
    Country: Country,
    Database: Database,
    DatabaseType: DatabaseType,
    MetroArea: MetroArea,
    MetroAreaState: MetroAreaState,
    State: State,
    Terminal: Terminal,
    TerminalType: TerminalType,
    Type: Type,
    TypeClassification: TypeClassification,
    UserAccount: UserAccount
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/travel-document-checkpoint'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return airApi.dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return airApi.ddS(Q.__dbApplication__, dbEntityId);
}
airApi.setQApplication(Q_APPLICATION);
//# sourceMappingURL=qApplication.js.map