import { addClasses } from '../classes'
import {
	IInjectionApplication,
	InjectionApplication
} from './InjectionApplication'

export interface IInjectionDomain {

	name: string

	app(
		applicationName: string
	): IInjectionApplication

	getApp(
		applicationName: string
	): IInjectionApplication

}

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

if (!globalThis.AIRPORT_DOMAIN_MAP) {
	globalThis.AIRPORT_DOMAIN_MAP = {}
}

export function domain(
	domainName: string
): IInjectionDomain {
	const DOMAIN_MAP = globalThis.AIRPORT_DOMAIN_MAP
	if (DOMAIN_MAP[domainName]) {
		return DOMAIN_MAP[domainName]
	}

	const domain = new InjectionDomain(domainName)

	DOMAIN_MAP[domainName] = domain

	return domain
}
globalThis.domain = domain

