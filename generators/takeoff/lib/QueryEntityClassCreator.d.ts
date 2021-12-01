import { IAirportDatabase, QApplication } from '@airport/air-control';
import { DbApplication } from '@airport/ground-control';
import { IApplication } from '@airport/airspace';
export interface IQueryEntityClassCreator {
    createAll(applications: IApplication[], airDb: IAirportDatabase): void;
}
export declare class QueryEntityClassCreator implements IQueryEntityClassCreator {
    createAll(applications: IApplication[], airDb: IAirportDatabase): void;
    create(dbApplication: DbApplication, airDb: IAirportDatabase): QApplication;
}
//# sourceMappingURL=QueryEntityClassCreator.d.ts.map