/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Country } from '../ddl/locality/Country';
import { State } from '../ddl/locality/State';
import { MetroAreaState } from '../ddl/locality/MetroAreaState';
import { MetroArea } from '../ddl/locality/MetroArea';
import { UserAccount } from '../ddl/UserAccount';
import { Continent } from '../ddl/locality/Continent';
import { Classification } from '../ddl/type/Classification';
import { TypeClassification } from '../ddl/type/TypeClassification';
import { Type } from '../ddl/type/Type';
import { ClientType } from '../ddl/client/ClientType';
import { Client } from '../ddl/client/Client';
import { DatabaseType } from '../ddl/database/DatabaseType';
import { Database } from '../ddl/database/Database';
import { TerminalType } from '../ddl/terminal/TerminalType';
import { Terminal } from '../ddl/terminal/Terminal';

DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'travel-document-checkpoint');
  accumulator.add(Country, 0);
  accumulator.add(State, 1);
  accumulator.add(MetroAreaState, 2);
  accumulator.add(MetroArea, 3);
  accumulator.add(UserAccount, 4);
  accumulator.add(Continent, 5);
  accumulator.add(Classification, 6);
  accumulator.add(TypeClassification, 7);
  accumulator.add(Type, 8);
  accumulator.add(ClientType, 9);
  accumulator.add(Client, 10);
  accumulator.add(DatabaseType, 11);
  accumulator.add(Database, 12);
  accumulator.add(TerminalType, 13);
  accumulator.add(Terminal, 14);
});
