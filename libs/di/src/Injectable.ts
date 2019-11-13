import {
	Container,
	IContainer
} from './Container'

export interface IInjectable {

	container?: IContainer

	c: IContainer

}

export class Injectable
	implements IInjectable {

	get c(): IContainer {
		return c(this)
	}

}

export function c(
	injectable: any
): IContainer {
	const container = (injectable as IInjectable).container

	if (!container) {
		throw new Error('"container" is not set on injectable object.')
	}
	if (!(container instanceof Container)) {
		throw new Error('"container" property of injectable is not an' +
			'instance of @airport/di Container')
	}

	return container
}