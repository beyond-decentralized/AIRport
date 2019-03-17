export interface IObserver<V> {
    next(value: V): void;
    error(errorValue: any): void;
}
