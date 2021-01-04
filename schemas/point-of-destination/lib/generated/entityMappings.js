import { AIR_DB } from '@airport/air-control';
import { DI } from '@airport/di';
import { DailyArchive } from '../ddl/DailyArchive';
DI.db().get(AIR_DB).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'point-of-destination');
    accumulator.add(DailyArchive, 0);
});
//# sourceMappingURL=entityMappings.js.map