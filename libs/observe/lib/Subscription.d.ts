export interface ISubscription {
    unsubscribe(): void;
    closed: boolean;
}
export declare class Subscription implements ISubscription {
    private onUnsubscribe?;
    private _closed;
    constructor(onUnsubscribe?: () => void);
    unsubscribe(): void;
    readonly closed: boolean;
}
