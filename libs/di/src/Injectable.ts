import {
	Container,
	IChildContainer
} from './Container'

export interface IInjectable {

	container?: IChildContainer

}

export function container(
	injectable: any
): IChildContainer {
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