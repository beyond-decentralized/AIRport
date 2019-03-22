import { Observable } from './Observable';
export interface ISubscription {
    unsubscribe(): void;
    closed: boolean;
}
export declare class Subscription implements ISubscription {
    private observable;
    onNext: {
        (value: any): void;
    };
    onError?: {
        (error: any): void;
    };
    onComplete?: Function;
    onUnsubscribe?: {
        (value: any): void;
    };
    private _closed;
    constructor(observable: Observable<any>, onNext: {
        (value: any): void;
    }, onError?: {
        (error: any): void;
    }, onComplete?: Function, onUnsubscribe?: {
        (value: any): void;
    });
    unsubscribe(onUnsubscribe?: () => void): void;
    readonly closed: boolean;
}
