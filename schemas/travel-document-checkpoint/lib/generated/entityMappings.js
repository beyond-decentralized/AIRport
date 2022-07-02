/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Country } from '../ddl/locality/Country';
import { State } from '../ddl/locality/State';
import { MetroArea } from '../ddl/locality/MetroArea';
import { User } from '../ddl/User';
import { Continent } from '../ddl/locality/Continent';
import { MetroAreaState } from '../ddl/locality/MetroAreaState';
import { ClientType } from '../ddl/client/ClientType';
import { Client } from '../ddl/client/Client';
import { TerminalType } from '../ddl/terminal/TerminalType';
import { Terminal } from '../ddl/terminal/Terminal';
import { UserTerminal } from '../ddl/terminal/UserTerminal';
DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'travel-document-checkpoint');
    accumulator.add(Country, 0);
    accumulator.add(State, 1);
    accumulator.add(MetroArea, 2);
    accumulator.add(User, 3);
    accumulator.add(Continent, 4);
    accumulator.add(MetroAreaState, 5);
    accumulator.add(ClientType, 6);
    accumulator.add(Client, 7);
    accumulator.add(TerminalType, 8);
    accumulator.add(Terminal, 9);
    accumulator.add(UserTerminal, 10);
});
//# sourceMappingURL=entityMappings.js.map