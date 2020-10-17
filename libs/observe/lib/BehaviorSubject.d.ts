import { Subject } from './Subject';
export declare class BehaviorSubject<V> extends Subject<V> {
    constructor(value: V);
    next(value: V): void;
    clear(): void;
}
//# sourceMappingURL=BehaviorSubject.d.ts.map