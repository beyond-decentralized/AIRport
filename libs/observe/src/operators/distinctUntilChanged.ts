import distinctUntilChangedFile from 'rxjs/dist/esm/internal/operators/distinctUntilChanged';
import { distinctUntilChanged as IRxDistinctUntilChanged } from 'rxjs/operators';

const rxDistinctUntilChanged: typeof IRxDistinctUntilChanged = distinctUntilChangedFile.distinctUntilChanged;

export const distinctUntilChanged = rxDistinctUntilChanged;

// import {IObservable} from '../Observable'
// import {
// 	IOperator,
// 	Operator
// }                    from './operator'
//
// export function distinctUntilChanged<T>(): IOperator<T, T> {
// 	return new DistinctUntilChangedOperator<T>()
// }
//
// export class DistinctUntilChangedOperator<T>
// 	extends Operator<T, T> {
//
// 	exec(
// 		source: IObservable<T>
// 	): T {
// 		if (!source.upstream || !source.upstream.length) {
// 			return source.currentValue
// 		}
//
// 		let up$CurVal = source.upstream[0].currentValue
// 		if (source.upstream.length > 1) {
// 			up$CurVal = source.upstream.map(
// 				up$source => up$source.currentValue)
// 		}
//
// 		try {
// 			if (!source.up$LastVal) {
// 				return up$CurVal
// 			}
//
// 			if (source.upstream.every((
// 				up$source,
// 				index
// 			) =>
// 				up$source.currentValue === up$CurVal[index])) {
// 				return source.currentValue
// 			}
//
// 			return up$CurVal
// 		} finally {
// 			source.up$LastVal = up$CurVal
// 		}
// 	}
//
// }
