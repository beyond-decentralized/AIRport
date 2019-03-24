import { ILogEntry, ILogEntryValue } from "@airport/runway-edge-lighting";
/**
 * TODO: When inserting log records into terminal, first collect all of them
 * and then insert at transaction commit time.
 *
 * We may also provide a flush() method, if messages are not generated
 * in a transactional context.
 */
export interface ILogEntryBatch {
}
export declare class LogEntryBatch implements ILogEntryBatch {
    logEntries: ILogEntry[];
    logEntryValues: ILogEntryValue[];
}
