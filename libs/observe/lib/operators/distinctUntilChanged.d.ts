import { IObservable } from '../Observable';
import { IOperator, Operator } from './operator';
export declare function distinctUntilChanged<T>(): IOperator<T, T>;
export declare class DistinctUntilChangedOperator<T> extends Operator<T, T> {
    exec(source: IObservable<T>): T;
}
