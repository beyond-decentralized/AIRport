/**
 * TODO: add Zone.js thread local context
 */
export declare class Airport {
    private static nextGlobalTransactionId;
    static startTransaction(): number;
    static commitTransaction(globalTransactionId: number): void;
    static rollbackTransaction(globalTransactionId: number): void;
}
