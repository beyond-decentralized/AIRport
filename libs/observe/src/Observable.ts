import { Observable as RxObservable } from 'rxjs';
// import ObservableFile                 from 'rxjs/dist/esm/internal/Observable';
import { IObserver }                  from './Observer';
import { IOperator }                  from './operators/operator';
import { ISubscription }              from './Subscription';

// const RxObservableImpl: typeof RxObservable = ObservableFile.Observable;

/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<T>
	extends RxObservable<T> {

	pipe(): RxObservable<T>;

	// pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
	// pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
	// pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
	// pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
	// pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
	// pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>;
	// pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G>;
	// pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): Observable<H>;
	// pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): Observable<I>;
	// pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): Observable<unknown>;

	pipe<T2, T3, T4, T5, T6, T7, T8, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, T5>,
		operator5: IOperator<T5, T6>,
		operator6: IOperator<T6, T7>,
		operator7: IOperator<T7, T8>,
		operator8: IOperator<T8, R>,
		...operators: IOperator<any, any>[]
	): IObservable<unknown>

	pipe<T2, T3, T4, T5, T6, T7, T8, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, T5>,
		operator5: IOperator<T5, T6>,
		operator6: IOperator<T6, T7>,
		operator7: IOperator<T7, T8>,
		operator8: IOperator<T8, R>
	): IObservable<R>

	pipe<T2, T3, T4, T5, T6, T7, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, T5>,
		operator5: IOperator<T5, T6>,
		operator6: IOperator<T6, T7>,
		operator7: IOperator<T7, R>
	): IObservable<R>

	pipe<T2, T3, T4, T5, T6, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, T5>,
		operator5: IOperator<T5, T6>,
		operator6: IOperator<T6, R>
	): IObservable<R>

	pipe<T2, T3, T4, T5, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, T5>,
		operator5: IOperator<T5, R>
	): IObservable<R>

	pipe<T2, T3, T4, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, R>
	): IObservable<R>

	pipe<T2, T3, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, R>
	): IObservable<R>

	pipe<T2, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, R>
	): IObservable<R>

	pipe<R>(operator: IOperator<T, R>): IObservable<R>

	pipe<R>(...operators: IOperator<any, any>[]): IObservable<R>

	// Subscribes to the sequence with an observer
	// subscribe(observer: IObserver<V>): ISubscription

	// Subscribes to the sequence with callbacks
	// subscribe(
	// 	onNext: { (value: T): void },
	// 	onError?: Function,
	// 	onComplete?: Function
	// ): ISubscription

	subscribe(observer?: Partial<IObserver<T>>): ISubscription;

	/** @deprecated Use an observer instead of a complete callback */
	subscribe(
		next: null | undefined,
		error: null | undefined,
		complete: () => void
	): ISubscription;

	/** @deprecated Use an observer instead of an error callback */
	subscribe(
		next: null | undefined,
		error: (error: any) => void,
		complete?: () => void
	): ISubscription;

	/** @deprecated Use an observer instead of a complete callback */
	subscribe(
		next: (value: T) => void,
		error: null | undefined,
		complete: () => void
	): ISubscription;

	subscribe(
		next?: (value: T) => void,
		error?: (error: any) => void,
		complete?: () => void
	): ISubscription;

	// exec(
	// 	value: T,
	// 	callbackName: 'onError' | 'onNext',
	// 	context: any
	// ): void

	// stop(): void

	// upstream: IObservable<any>[]
	// downstream: IObservable<any>[]
	//
	// currentValue: T
	// // lastValue: V
	//
	// up$LastVal

}

// export const Observable = RxObservableImpl;

/*
export class Observable<T>
	implements IObservable<T> {

	static from(...sourceObservables: (IObservable<any> | Promise<IObservable<any>>)[]): IObservable<any> {
		// if (!(sourceObservable instanceof Observable)) {
		// 	throw new Error('only @airport/observer/Observable is supported')
		// }
		const targetObservable: IObservable<any> = new Observable<any>()
		sourceObservables.forEach(
			aSourceObservable => {
				if (aSourceObservable instanceof Promise) {
					aSourceObservable.then(
						sourceObservable => {
							sourceObservable.downstream.push(targetObservable)
							targetObservable.upstream.push(sourceObservable)
						})
				} else {
					aSourceObservable.downstream.push(targetObservable)
					targetObservable.upstream.push(aSourceObservable)
				}
			})

		return targetObservable
	}

	constructor(private onUnsubscribe?: () => void) {
	}

	operators: IOperator<any, any>[] = []

	upstream: Observable<any>[]   = []
	up$LastVal
	downstream: Observable<any>[] = []

	currentValue: T
	lastValue: T

	numDownstreamSubscriptions = 0

	subscriptions: Subscription[] = []

	pipe<T2, T3, T4, T5, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, T5>,
		operator5: IOperator<T5, R>
	): IObservable<R>
	pipe<T2, T3, T4, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, T4>,
		operator4: IOperator<T4, R>
	): IObservable<R>
	pipe<T2, T3, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, T3>,
		operator3: IOperator<T3, R>
	): IObservable<R>
	pipe<T2, R>(
		operator1: IOperator<T, T2>,
		operator2: IOperator<T2, R>
	): IObservable<R>
	pipe<R>(operator: IOperator<T, R>): IObservable<R>
	pipe<V>(...operators: IOperator<any, any>[]): IObservable<any> {
		// if (!(sourceObservable instanceof Observable)) {
		// 	throw new Error('only @airport/observer/Observable is supported')
		// }
		const targetObservable: Observable<any> = Observable.from(this) as any
		targetObservable.operators              = operators

		return targetObservable
	}


	exec(
		value: T,
		callbackName: 'onError' | 'onNext',
		upstreamObservable?: Observable<any>
	): void {
		this.clear()

		if (!this.subscriptions.length && !this.numDownstreamSubscriptions || value === undefined) {
			return
		}

		this.forceExec(value, callbackName, upstreamObservable, true)
	}

	forceExec(
		value: T,
		callbackName: 'onError' | 'onNext',
		upstreamObservable?: Observable<any>,
		cleared?: boolean
	): void {
		if (!cleared) {
			this.clear()
		}

		// this.lastValue = this.currentValue
		// const theValue    = this.currentValue
		// this.currentValue = undefined
		// this.valueFromUpstream()
		//
		// if (this.currentValue === undefined) {
		// 	this.currentValue = theValue
		// }

		if (this.upstream.length) {
			throw new Error('Cannot set value on a derived Observable')
		}

		this.currentValue = value

		this.subscriptions.forEach(
			subscription => {
				subscription[callbackName](this.currentValue)
				// if (this.currentValue instanceof Array) {
				// 	(subscription[callbackName] as any)(...this.currentValue)
				// } else {
				// 	subscription[callbackName](this.currentValue)
				// }
			})

		this.downstream.forEach(
			observable => {
				observable.exec(this.currentValue, callbackName, this)
			})
	}

	// stop(): void {
	//
	// }

	// subscribe(
	// 	observer: IObserver<V>
	// ): ISubscription
	subscribe(
		onNext: { (value: any): void },
		onError?: { (value: any): void },
		onComplete?: Function
	): ISubscription
	// subscribe(
	// 	observer: IObserver<V> | { (value: V): void },
	// 	onError?: Function,
	// 	onComplete?: Function
	// ): ISubscription
	{
		// if (!(observer instanceof Function)) {
		// 	throw new Error('Subjects can only be subscribed to with functions')
		// }

		const subscription = new Subscription(this, onNext, onError, onComplete, this.onUnsubscribe)

		this.subscriptions.push(subscription)
		this.subscribeUpstream()

		onNext(this.valueFromUpstream())


		return subscription
	}

	unsubscribeUpstream() {
		for (const up of this.upstream) {
			up.numDownstreamSubscriptions--
			up.unsubscribeUpstream()
		}
	}

	protected clear(): void {
		this.currentValue = undefined

		this.downstream.forEach(
			observable => observable.clear())
	}

	private valueFromUpstream(): T {
		if (this.currentValue !== undefined) {
			return this.currentValue
		}
		this.currentValue = this.upstream.map(
			upstreamObservable => upstreamObservable.valueFromUpstream())[0] as any

		for (const operator of this.operators) {
			this.currentValue = operator.exec(this)
		}

		return this.currentValue
	}

	private subscribeUpstream(): void {
		for (const up of this.upstream) {
			up.numDownstreamSubscriptions++
			up.subscribeUpstream()
		}
	}

}
*/
