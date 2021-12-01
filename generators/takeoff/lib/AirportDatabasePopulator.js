import { DI } from '@airport/di';
import { AIRPORT_DATABASE_POPULATOR } from './tokens';
// TODO: probably not needed, included application source populates itself
// May be needed to populate applications from the database
export class AirportDatabasePopulator {
    populate() {
        // FIXME: implement
        // this.airDb.applications
        // this.airDb.qApplications
    }
}
DI.set(AIRPORT_DATABASE_POPULATOR, AirportDatabasePopulator);
//# sourceMappingURL=AirportDatabasePopulator.js.map