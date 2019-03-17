import { IObservable } from '../Observable';
export declare function pipe<V, R = V>(sourceObservable: IObservable<V>, callback: {
    (value: V, context: any): R;
}): IObservable<R>;
