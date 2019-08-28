export declare function transact(): Promise<void>;
export declare function commit(): Promise<void>;
export declare function rollback(): Promise<void>;
/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
export declare function transactional<T>(callback: () => Promise<T>, keepAlive?: boolean): Promise<T>;
