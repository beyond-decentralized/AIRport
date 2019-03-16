import {Token} from './Token'

export interface IContainer {

	get(
		callback: (
			...objects: any[]
		) => void,
		...tokens: Token[]
	): void

	onInit(
		callback: () => void
	): void

	set(
		token: Token,
		clazz: any
	): void

}

export class Container {

	objects: any[]
	classes: any[]
	onInitCallback: () => void
	numPendingInits = 0

	get(
		callback: (...objects: any[]) => void,
		...tokens: Token[]
	): void {
		this.numPendingInits++
		setTimeout(() => {
			callback(tokens.map(
				token => {
					let object = this.objects[token]
					if (!object) {
						object              = new this.classes[token]()
						this.objects[token] = object
					}

					return object
				}))
			setTimeout(() => {
				if (this.numPendingInits === 0) {
					this.onInitCallback()
				}
			})
		})
	}

	onInit(
		callback: () => void
	): void {
		this.onInitCallback = callback
	}

	set(
		token: Token,
		clazz: any
	): void {
		this.classes[token] = clazz
	}

}

export const DI = new Container()
