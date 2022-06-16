import { airApi } from '@airport/aviation-communication';
import { Continent, Country, Terminal, User, UserTerminal } from '../ddl/ddl';
const __constructors__ = {
    Continent: Continent,
    Country: Country,
    Terminal: Terminal,
    User: User,
    UserTerminal: UserTerminal
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