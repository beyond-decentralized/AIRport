import { IObservable } from '../Observable';
import { IOperator, Operator } from './operator';
export declare function map<T, R>(project: (value: T) => R): IOperator<T, R>;
export declare class MapOperator<T, R> extends Operator<T, R> {
    private project;
    constructor(project: (value: T) => R);
    exec(source: IObservable<T>): R;
}
