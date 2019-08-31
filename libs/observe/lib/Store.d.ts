import { BehaviorSubject } from './BehaviorSubject';
export declare class Store<V> extends BehaviorSubject<V> {
    constructor(value: V);
    next(value: V): void;
}
