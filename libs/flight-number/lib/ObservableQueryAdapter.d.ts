import { PortableQuery } from "@airport/ground-control";
import { Observable } from "rxjs";
import { ActiveQueries, IFieldMapped } from "./ActiveQueries";
export interface IObservableQueryAdapter {
    wrapInObservable<E>(portableQuery: PortableQuery, queryCallback: {
        (): Promise<any>;
    }): Observable<E>;
}
export declare class ObservableQueryAdapter<SQLQuery extends IFieldMapped> implements IObservableQueryAdapter {
    activeQueries: ActiveQueries<SQLQuery>;
    wrapInObservable<E>(portableQuery: PortableQuery, queryCallback: {
        (): Promise<any>;
    }): Observable<E>;
}
//# sourceMappingURL=ObservableQueryAdapter.d.ts.map