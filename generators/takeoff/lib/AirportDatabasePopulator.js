import { DI } from '@airport/di';
import { AIR_DB_POPULATOR } from './tokens';
// TODO: probably not needed, included schema source populates itself
// May be needed to populate schemas from the database
export class AirportDatabasePopulator {
    populate() {
        // FIXME: implement
        // this.airDb.schemas
        // this.airDb.qSchemas
    }
}
DI.set(AIR_DB_POPULATOR, AirportDatabasePopulator);
//# sourceMappingURL=AirportDatabasePopulator.js.map