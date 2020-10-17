import { RecordHistory } from './RecordHistory';
/**
 * Created by Papa on 9/15/2016.
 */
export declare type RecordHistoryOldValueColumnIndex = number;
export declare type RecordHistoryOldValueOldValue = any;
/**
 * Currently, syncing databases are always SqLite dbs.  This means
 * we don't need to store types for values.  If a need arises type
 * specific FieldChange classes can always be added.  Having
 * VARCHAR and NUMBER should suffice for other db implementations.
 * NUMBER covers (dates, booleans and numbers).  Maybe REALs will
 * also be required.
 */
export declare class RecordHistoryOldValue {
    recordHistory: RecordHistory;
    columnIndex: RecordHistoryOldValueColumnIndex;
    oldValue: RecordHistoryOldValueOldValue;
}
//# sourceMappingURL=RecordHistoryOldValue.d.ts.map