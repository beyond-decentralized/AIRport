import { IObservable } from '../Observable';
export declare function combineLatest<V, V2, R>(os: [IObservable<V2>], project: (v1: V, v2: V2) => R): IObservable<R>;
export declare function combineLatest<V, V2, V3, R>(os: [IObservable<V2>, IObservable<V3>], project: (v1: V, v2: V2, v3: V3) => R): IObservable<R>;
