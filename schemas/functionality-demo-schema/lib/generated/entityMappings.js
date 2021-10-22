/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { Level2 } from '../ddl/Level2';
import { Level1 } from '../ddl/Level1';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'functionality-demo-schema');
    accumulator.add(Level2, 0);
    accumulator.add(Level1, 1);
});
//# sourceMappingURL=entityMappings.js.map