export {};
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
//# sourceMappingURL=Observable.js.map