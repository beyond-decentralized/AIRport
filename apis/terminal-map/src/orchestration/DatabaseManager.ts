import {
    IContext
} from "@airport/di"
import {
    JsonSchema
} from "@airport/ground-control"

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
		context: IContext,
		...schemas: JsonSchema[]
	): Promise<void>;

	initNoDb(
		context: IContext,
		...schemas: JsonSchema[]
	): Promise<void>

}