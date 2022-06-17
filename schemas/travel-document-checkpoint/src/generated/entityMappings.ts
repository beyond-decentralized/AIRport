/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Client } from '../ddl/Client';
import { User } from '../ddl/User';
import { Country } from '../ddl/Country';
import { Continent } from '../ddl/Continent';
import { Terminal } from '../ddl/Terminal';
import { UserTerminal } from '../ddl/UserTerminal';

DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'travel-document-checkpoint');
  accumulator.add(Client, 0);
  accumulator.add(User, 1);
  accumulator.add(Country, 2);
  accumulator.add(Continent, 3);
  accumulator.add(Terminal, 4);
  accumulator.add(UserTerminal, 5);
});
