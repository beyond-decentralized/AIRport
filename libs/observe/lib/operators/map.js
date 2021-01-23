// import mapFile from 'rxjs/dist/esm/internal/operators/map';
// import { map as IRxMap } from 'rxjs/operators';
//
// const rxMap: typeof IRxMap = mapFile.map
//
// export const map = rxMap;
// import {IObservable} from '../Observable'
// import {
// 	IOperator,
// 	Operator
// }                    from './operator'
//
// export function map<T, R>(
// 	project: (
// 		value: T
// 	) => R
// ): IOperator<T, R> {
// 	if (typeof project !== 'function') {
// 		throw new TypeError('map operator accepts a projection Function')
// 	}
// 	return new MapOperator<T, R>(project)
// }
//
// export class MapOperator<T, R>
// 	extends Operator<T, R> {
//
// 	constructor(
// 		private project: (
// 			value: T
// 		) => R
// 	) {
// 		super()
// 	}
//
// 	exec(
// 		source: IObservable<T>
// 	): R {
// 		return this.project(source.currentValue)
// 	}
//
// }
//# sourceMappingURL=map.js.map