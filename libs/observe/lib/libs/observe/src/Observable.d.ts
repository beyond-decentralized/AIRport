import { Observable as RxObservable } from 'rxjs';
import { IObserver } from './Observer';
import { IOperator } from './operators/operator';
import { ISubscription } from './Subscription';
/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<T> extends RxObservable<T> {
    pipe(): RxObservable<T>;
    pipe<T2, T3, T4, T5, T6, T7, T8, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, T5>, operator5: IOperator<T5, T6>, operator6: IOperator<T6, T7>, operator7: IOperator<T7, T8>, operator8: IOperator<T8, R>, ...operators: IOperator<any, any>[]): IObservable<unknown>;
    pipe<T2, T3, T4, T5, T6, T7, T8, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, T5>, operator5: IOperator<T5, T6>, operator6: IOperator<T6, T7>, operator7: IOperator<T7, T8>, operator8: IOperator<T8, R>): IObservable<R>;
    pipe<T2, T3, T4, T5, T6, T7, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, T5>, operator5: IOperator<T5, T6>, operator6: IOperator<T6, T7>, operator7: IOperator<T7, R>): IObservable<R>;
    pipe<T2, T3, T4, T5, T6, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, T5>, operator5: IOperator<T5, T6>, operator6: IOperator<T6, R>): IObservable<R>;
    pipe<T2, T3, T4, T5, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, T5>, operator5: IOperator<T5, R>): IObservable<R>;
    pipe<T2, T3, T4, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, R>): IObservable<R>;
    pipe<T2, T3, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, R>): IObservable<R>;
    pipe<T2, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, R>): IObservable<R>;
    pipe<R>(operator: IOperator<T, R>): IObservable<R>;
    pipe<R>(...operators: IOperator<any, any>[]): IObservable<R>;
    subscribe(observer?: Partial<IObserver<T>>): ISubscription;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: null | undefined, error: null | undefined, complete: () => void): ISubscription;
    /** @deprecated Use an observer instead of an error callback */
    subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): ISubscription;
    /** @deprecated Use an observer instead of a complete callback */
    subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): ISubscription;
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): ISubscription;
}
//# sourceMappingURL=Observable.d.ts.map