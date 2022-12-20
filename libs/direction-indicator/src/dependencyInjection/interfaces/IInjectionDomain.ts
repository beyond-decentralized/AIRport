import { IInjectionApplication } from "./IInjectionApplication"

export interface IInjectionDomain {

	name: string

	app(
		applicationName: string
	): IInjectionApplication

	getApp(
		applicationName: string
	): IInjectionApplication

}