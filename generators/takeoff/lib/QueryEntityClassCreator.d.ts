import { IAirportDatabase } from '@airport/air-traffic-control';
import { QApplication } from '@airport/aviation-communication';
import { IApplication } from '@airport/airspace';
import { DbApplication } from '@airport/ground-control';
import { IQueryEntityClassCreator } from '@airport/terminal-map';
import { IApplicationUtils, IRelationManager } from '@airport/tarmaq-query';
export declare class QueryEntityClassCreator implements IQueryEntityClassCreator {
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    relationManager: IRelationManager;
    createAll(applications: IApplication[]): void;
    create(dbApplication: DbApplication): QApplication;
}
//# sourceMappingURL=QueryEntityClassCreator.d.ts.map