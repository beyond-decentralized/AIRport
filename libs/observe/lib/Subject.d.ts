import { IObservable, Observable } from './Observable';
import { IObserver } from './Observer';
export interface ISubject<V> extends IObservable<V>, IObserver<V> {
}
export declare class Subject<V> extends Observable<V> implements ISubject<V> {
    error(errorValue: any): void;
    next(value: V): void;
}
