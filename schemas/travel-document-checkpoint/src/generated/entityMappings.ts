/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { Continent } from '../ddl/Continent';
import { Country } from '../ddl/Country';
import { UserTerminal } from '../ddl/UserTerminal';
import { UserTerminalAgt } from '../ddl/UserTerminalAgt';
import { User } from '../ddl/User';
import { Terminal } from '../ddl/Terminal';
import { TerminalAgt } from '../ddl/TerminalAgt';
import { Agt } from '../ddl/Agt';

DI.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'travel-document-checkpoint');
  accumulator.add(Continent, 0);
  accumulator.add(Country, 1);
  accumulator.add(UserTerminal, 2);
  accumulator.add(UserTerminalAgt, 3);
  accumulator.add(User, 4);
  accumulator.add(Terminal, 5);
  accumulator.add(TerminalAgt, 6);
  accumulator.add(Agt, 7);
});
