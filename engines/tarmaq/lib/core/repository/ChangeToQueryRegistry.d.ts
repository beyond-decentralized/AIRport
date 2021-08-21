import { TableMap } from '@airport/ground-control';
import { ISubject } from '@airport/observe';
/**
 * Created by Papa on 9/10/2016.
 */
export declare class Query {
    subject: ISubject<any>;
    fieldMap: TableMap;
}
export declare class ChangeToQueryRegistry {
    activeQueries: Query[];
    addQuery(subject: ISubject<any>, fieldMap: TableMap): void;
    removeQuery(subject: ISubject<any>): void;
    findAffectedQueries(changeRecords: any[]): Query[];
}
//# sourceMappingURL=ChangeToQueryRegistry.d.ts.map