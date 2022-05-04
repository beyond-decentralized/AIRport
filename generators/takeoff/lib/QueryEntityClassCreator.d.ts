import { IAirportDatabase, QApplication } from '@airport/air-traffic-control';
import { IApplication } from '@airport/airspace';
import { DbApplication } from '@airport/ground-control';
import { IQueryEntityClassCreator } from '@airport/terminal-map';
export declare class QueryEntityClassCreator implements IQueryEntityClassCreator {
    airportDatabase: IAirportDatabase;
    createAll(applications: IApplication[]): void;
    create(dbApplication: DbApplication): QApplication;
}
//# sourceMappingURL=QueryEntityClassCreator.d.ts.map