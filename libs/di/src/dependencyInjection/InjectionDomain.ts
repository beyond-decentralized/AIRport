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

	getAppBySignature(
		signature: string
	): IInjectionApplication

	mapApplicationBySignature(
		applicationName: string,
		signature: string
	): void

}

export class InjectionDomain
	implements IInjectionDomain {

	private applicationMap: {
		[applicationName: string]: IInjectionApplication
	} = {}

	private applicationMapBySignature: {
		[applicationSignature: string]: IInjectionApplication
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

	getAppBySignature(
		signature: string
	): IInjectionApplication {
		return this.applicationMapBySignature[signature]
	}

	mapApplicationBySignature(
		applicationName: string,
		signature: string
	): void {
		const application = this.applicationMap[applicationName]
		if (!application) {
			throw new Error(`Could not find Application: '${applicationName}', in domain: '${this.name}'`)
		}
		if (this.applicationMapBySignature[signature]) {
			throw new Error(`Domain '${this.name}' already has an Application '${applicationName}'
			for signature: ${signature}`)
		}
		this.applicationMapBySignature[signature] = application
	}

}

const DOMAIN_MAP: {
	[domainName: string]: InjectionDomain
} = {}

export function domain(
	domainName: string
): IInjectionDomain {
	if (DOMAIN_MAP[domainName]) {
		return DOMAIN_MAP[domainName]
	}

	const domain = new InjectionDomain(domainName)

	DOMAIN_MAP[domainName] = domain

	return domain
}

export const AIRPORT_DOMAIN: IInjectionDomain = domain('turbase.app')