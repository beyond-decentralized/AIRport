import { IObservable } from '../Observable';
export interface IOperator<T, R> {
    exec(observable: IObservable<T>): R;
}
export declare abstract class Operator<T, R> implements IOperator<T, R> {
    abstract exec(observable: IObservable<T>): R;
}
//# sourceMappingURL=operator.d.ts.map