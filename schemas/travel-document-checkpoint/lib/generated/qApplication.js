import { airApi } from '@airport/aviation-communication';
import { Agt, Continent, Country, Terminal, TerminalAgt, User, UserTerminal, UserTerminalAgt } from '../ddl/ddl';
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