import { Subject } from "rxjs";
import { TableMap } from "@airport/terminal-map";
/**
 * Created by Papa on 9/10/2016.
 */
export declare class Query {
    subject: Subject<any>;
    fieldMap: TableMap;
}
export declare class ChangeToQueryRegistry {
    activeQueries: Query[];
    addQuery(subject: Subject<any>, fieldMap: TableMap): void;
    removeQuery(subject: Subject<any>): void;
    findAffectedQueries(changeRecords: any[]): Query[];
}
