import { IObservable } from './Observable';
export declare function pipe<V, R = V>(sourceObservable: IObservable<R>, callback: {
    (value: V, context: any): R;
}): IObservable<R>;
export declare function pipe<S1, S2, R>(sourceObservable: IObservable<R>, callback: {
    (value1: S1, value2: S2, context: any): R;
}): IObservable<R>;
export declare function pipe<S1, S2, S3, R>(sourceObservable: IObservable<R>, callback: {
    (value1: S1, value2: S2, value3: S3, context: any): R;
}): IObservable<R>;
export declare function pipe<S1, S2, S3, S4, R>(sourceObservable: IObservable<R>, callback: {
    (value1: S1, value2: S2, value3: S3, value4: S4, context: any): R;
}): IObservable<R>;
export declare function pipe<S1, S2, S3, S4, S5, R>(sourceObservable: IObservable<R>, callback: {
    (value1: S1, value2: S2, value3: S3, value4: S4, value5: S5, context: any): R;
}): IObservable<R>;
