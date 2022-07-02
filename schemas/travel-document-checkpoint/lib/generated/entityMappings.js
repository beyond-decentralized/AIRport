/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Continent } from '../ddl/locality/Continent';
import { Country } from '../ddl/locality/Country';
import { State } from '../ddl/locality/State';
import { MetroArea } from '../ddl/locality/MetroArea';
import { User } from '../ddl/User';
import { MetroAreaState } from '../ddl/locality/MetroAreaState';
import { Classification } from '../ddl/type/Classification';
import { TypeClassification } from '../ddl/type/TypeClassification';
import { Type } from '../ddl/type/Type';
import { ClientType } from '../ddl/client/ClientType';
import { Client } from '../ddl/client/Client';
import { TerminalType } from '../ddl/terminal/TerminalType';
import { Terminal } from '../ddl/terminal/Terminal';
import { UserTerminal } from '../ddl/terminal/UserTerminal';
import { DatabaseType } from '../ddl/database/DatabaseType';
import { Database } from '../ddl/database/Database';
DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'travel-document-checkpoint');
    accumulator.add(Continent, 0);
    accumulator.add(Country, 1);
    accumulator.add(State, 2);
    accumulator.add(MetroArea, 3);
    accumulator.add(User, 4);
    accumulator.add(MetroAreaState, 5);
    accumulator.add(Classification, 6);
    accumulator.add(TypeClassification, 7);
    accumulator.add(Type, 8);
    accumulator.add(ClientType, 9);
    accumulator.add(Client, 10);
    accumulator.add(TerminalType, 11);
    accumulator.add(Terminal, 12);
    accumulator.add(UserTerminal, 13);
    accumulator.add(DatabaseType, 14);
    accumulator.add(Database, 15);
});
//# sourceMappingURL=entityMappings.js.map