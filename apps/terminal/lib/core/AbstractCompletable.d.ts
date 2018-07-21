import { Subscription } from "rxjs/Subscription";
export interface IAbstractCompletable {
    initialize(): Promise<void>;
    tearDown(): Promise<void>;
}
export declare abstract class AbstractCompletable implements IAbstractCompletable {
    private subsriptions;
    abstract initialize(): Promise<void>;
    tearDown(): Promise<void>;
    protected record(subscription: Subscription): void;
}
