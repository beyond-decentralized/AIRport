/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { Parent } from '../ddl/Parent';
import { Child } from '../ddl/Child';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'functionality-demo-schema');
    accumulator.add(Parent, 0);
    accumulator.add(Child, 1);
});
//# sourceMappingURL=entityMappings.js.map