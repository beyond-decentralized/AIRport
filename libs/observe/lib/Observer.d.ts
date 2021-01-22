/**
 * An Observer is used to receive data from an Observable, and is supplied as an argument
 * to subscribe.
 *
 * All methods are optional.
 */
import { Observer } from 'rxjs';
export interface IObserver<V> extends Observer<V> {
    next(value: V): void;
    error(errorValue: any): void;
    complete(): void;
}
//# sourceMappingURL=Observer.d.ts.map