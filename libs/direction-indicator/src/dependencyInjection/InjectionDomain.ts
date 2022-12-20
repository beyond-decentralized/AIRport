import { addClasses } from '../classes'
import {
	IInjectionApplication
} from './interfaces/IInjectionApplication'
import {
	InjectionApplication
} from './InjectionApplication'
import { IApplicationDescriptor } from './interfaces/Token'
import { IInjectionDomain } from './interfaces/IInjectionDomain'



export class InjectionDomain
	implements IInjectionDomain {

	private applicationMap: {
		[applicationName: string]: IInjectionApplication
	} = {}

	constructor(
		public name: string
	) {
	}

	app(
		applicationName: string
	): IInjectionApplication {
		if (this.applicationMap[applicationName]) {
			throw new Error(`
			Application already defined.
			Domain:      ${this.name}
			Application: ${applicationName}
			`)
		}

		const application = new InjectionApplication(applicationName, this)
		application.getDomain = domain

		this.applicationMap[applicationName] = application

		return application
	}

	getApp(
		applicationName: string
	): IInjectionApplication {
		return this.applicationMap[applicationName]
	}

}
addClasses([InjectionDomain])

let injectionDomain: IInjectionDomain
if (globalThis.AIRPORT_DOMAIN) {
	injectionDomain = globalThis.AIRPORT_DOMAIN
} else {
	injectionDomain = domain('airport')
	globalThis.AIRPORT_DOMAIN = injectionDomain
}
export const AIRPORT_DOMAIN = injectionDomain

export function domain(
	domainName: string
): IInjectionDomain {
	if (!globalThis.AIRPORT_DOMAIN_MAP) {
		globalThis.AIRPORT_DOMAIN_MAP = {}
	}
	const DOMAIN_MAP = globalThis.AIRPORT_DOMAIN_MAP
	if (DOMAIN_MAP[domainName]) {
		return DOMAIN_MAP[domainName]
	}

	const domain = new InjectionDomain(domainName)

	DOMAIN_MAP[domainName] = domain

	return domain
}
globalThis.domain = domain



export function app(
	applicationDescriptor: IApplicationDescriptor
): IInjectionApplication {
	const airDomain = domain(applicationDescriptor.domain.name)

	return airDomain.app(applicationDescriptor.name)
}