import { IObservable } from '../Observable';
export declare function combineLatest<V1, V2, R>(os: [IObservable<V1>, IObservable<V2>], context: any, project: (v1: V1, v2: V2) => R): IObservable<R>;
export declare function combineLatest<V1, V2, V3, R>(os: [IObservable<V1>, IObservable<V2>, IObservable<V3>], context: any, project: (v1: V1, v2: V2, v3: V3) => R): IObservable<R>;
