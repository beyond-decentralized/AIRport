import { IAirportDatabase, QApplication } from '@airport/air-control';
import { IApplication } from '@airport/airspace';
import { DbApplication } from '@airport/ground-control';
import { IQueryEntityClassCreator } from '@airport/terminal-map';
export declare class QueryEntityClassCreator implements IQueryEntityClassCreator {
    createAll(applications: IApplication[], airDb: IAirportDatabase): void;
    create(dbApplication: DbApplication, airDb: IAirportDatabase): QApplication;
}
//# sourceMappingURL=QueryEntityClassCreator.d.ts.map