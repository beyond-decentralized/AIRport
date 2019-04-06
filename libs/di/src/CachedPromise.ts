import {DI}      from './Container'
import {DiToken} from './Token'

export interface ICachedPromise<A> {

	get(): Promise<A>
}

export class CachedPromise<A>
	implements ICachedPromise<A> {

	private injectable: A

	constructor(
		private token: DiToken<A>
	) {
	}

	async get(): Promise<A> {
		if (this.injectable) {
			return this.injectable
		}
		this.injectable = await DI.getP(this.token)

		return this.injectable
	}
}
