import {IObservable} from '../Observable'

export interface IOperator<T, R> {

	exec(
		observable: IObservable<T>
	): R
}

export abstract class Operator<T, R>
	implements IOperator<T, R> {

	abstract exec(
		observable: IObservable<T>
	): R

}
