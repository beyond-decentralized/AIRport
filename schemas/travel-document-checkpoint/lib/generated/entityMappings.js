/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { UserTerminal } from '../ddl/UserTerminal';
import { UserTerminalAgt } from '../ddl/UserTerminalAgt';
import { User } from '../ddl/User';
import { Terminal } from '../ddl/Terminal';
import { TerminalAgt } from '../ddl/TerminalAgt';
import { Agt } from '../ddl/Agt';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'travel-document-checkpoint');
    accumulator.add(UserTerminal, 0);
    accumulator.add(UserTerminalAgt, 1);
    accumulator.add(User, 2);
    accumulator.add(Terminal, 3);
    accumulator.add(TerminalAgt, 4);
    accumulator.add(Agt, 5);
});
//# sourceMappingURL=entityMappings.js.map