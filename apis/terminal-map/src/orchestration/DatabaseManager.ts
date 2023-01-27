import { JsonApplicationWithLastIds } from "@airport/air-traffic-control";
import {
	IContext
} from "@airport/direction-indicator"

export interface IDatabaseManager {

	/*
		ensureInitialized(
			terminalName: string,
			timeout: number
		): Promise<void>;

		initializeAll(
			defaultStoreType: StoreType
		): Promise<void>;
	*/

	isInitialized(): boolean;

	initWithDb(
		domainName: string,
		context: IContext
	): Promise<void>;

	initNoDb(
		context: IContext,
		...applications: JsonApplicationWithLastIds[]
	): Promise<void>

	initFeatureApplications(
		context: IContext,
		jsonApplications?: JsonApplicationWithLastIds[],
	): void

}