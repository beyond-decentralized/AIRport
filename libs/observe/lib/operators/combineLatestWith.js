import combineLatestWithFile from 'rxjs/dist/esm/internal/operators/combineLatestWith';
const rxCombineLatestWith = combineLatestWithFile.combineLatestWith;
export const combineLatestWith = rxCombineLatestWith;
// export const combineLatestWith: rxCombineLatestWith = rxCombineLatestWith;
// import {
// 	IObservable
// } from '../Observable'
//
// export function combineLatest<V1, V2, R>(
// 	os: [IObservable<V1>, IObservable<V2>],
// 	context: any,
// 	project: (
// 		v1: V1,
// 		v2: V2
// 	) => R
// ): IObservable<R>;
// export function combineLatest<V1, V2, V3, R>(
// 	os: [IObservable<V1>, IObservable<V2>, IObservable<V3>],
// 	context: any,
// 	project: (
// 		v1: V1,
// 		v2: V2,
// 		v3: V3
// 	) => R
// ): IObservable<R>;
// export function combineLatest<V, R>(
// 	observables: IObservable<unknown>[],
// 	context: any,
// 	callback: { (...args: unknown[]): R }
// ): R {
// 	throw new Error(`Please use Observable.from(o1, o2, ...)`)
// }
//# sourceMappingURL=combineLatestWith.js.map