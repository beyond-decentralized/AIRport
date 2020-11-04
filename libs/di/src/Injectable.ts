import {
	Container,
	IChildContainer
} from './Container'

export interface IInjectable {

	__container__?: IChildContainer

}

export function container(
	injectable: any
): IChildContainer {
	const iocContainer = (injectable as IInjectable).__container__

	if (!iocContainer) {
		throw new Error('"container" is not set on injectable object.')
	}
	if (!(iocContainer instanceof Container)) {
		throw new Error('"container" property of injectable is not an' +
			'instance of @airport/di Container')
	}

	return iocContainer
}
