import { IObservable } from '../Observable';
export declare function merge<R>(...observables: IObservable<any>[]): IObservable<R>;
