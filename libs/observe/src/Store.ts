import {BehaviorSubject} from './BehaviorSubject'

export class Store<V>
	extends BehaviorSubject<V> {

	constructor(value: V) {
		super(value)
	}

	next(value: V): void {
		this.forceExec(value, 'onNext')
	}

}