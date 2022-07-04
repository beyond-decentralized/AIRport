/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Country } from '../ddl/locality/Country';
import { State } from '../ddl/locality/State';
import { MetroArea } from '../ddl/locality/MetroArea';
import { User } from '../ddl/User';
import { Continent } from '../ddl/locality/Continent';
import { Classification } from '../ddl/type/Classification';
import { TypeClassification } from '../ddl/type/TypeClassification';
import { Type } from '../ddl/type/Type';
import { ClientType } from '../ddl/client/ClientType';
import { Client } from '../ddl/client/Client';
import { DatabaseType } from '../ddl/database/DatabaseType';
import { Database } from '../ddl/database/Database';
import { MetroAreaState } from '../ddl/locality/MetroAreaState';
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
    accumulator.add(Classification, 5);
    accumulator.add(TypeClassification, 6);
    accumulator.add(Type, 7);
    accumulator.add(ClientType, 8);
    accumulator.add(Client, 9);
    accumulator.add(DatabaseType, 10);
    accumulator.add(Database, 11);
    accumulator.add(MetroAreaState, 12);
    accumulator.add(TerminalType, 13);
    accumulator.add(Terminal, 14);
    accumulator.add(UserTerminal, 15);
});
//# sourceMappingURL=entityMappings.js.map