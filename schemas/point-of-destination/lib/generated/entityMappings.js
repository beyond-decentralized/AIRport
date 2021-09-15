/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { DailyArchive } from '../ddl/DailyArchive';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'point-of-destination');
    accumulator.add(DailyArchive, 0);
});
//# sourceMappingURL=entityMappings.js.map