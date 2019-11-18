import {Subject} from './Subject'

export class BehaviorSubject<V>
	extends Subject<V> {

	constructor(
		value: V
	) {
		super()
		this.currentValue = value
	}

	next(value: V): void {
		this.currentValue = value
		this.exec(value, 'onNext')
	}

	clear(): void {
	}

}
