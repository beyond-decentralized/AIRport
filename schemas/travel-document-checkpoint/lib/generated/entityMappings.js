/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Country } from '../ddl/locality/Country';
import { State } from '../ddl/locality/State';
import { MetroArea } from '../ddl/locality/MetroArea';
import { User } from '../ddl/User';
import { Continent } from '../ddl/locality/Continent';
import { Client } from '../ddl/Client';
import { Terminal } from '../ddl/Terminal';
import { UserTerminal } from '../ddl/UserTerminal';
import { MetroAreaState } from '../ddl/locality/MetroAreaState';
DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'travel-document-checkpoint');
    accumulator.add(Country, 0);
    accumulator.add(State, 1);
    accumulator.add(MetroArea, 2);
    accumulator.add(User, 3);
    accumulator.add(Continent, 4);
    accumulator.add(Client, 5);
    accumulator.add(Terminal, 6);
    accumulator.add(UserTerminal, 7);
    accumulator.add(MetroAreaState, 8);
});
//# sourceMappingURL=entityMappings.js.map