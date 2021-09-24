import {
    IContext
} from "@airport/di"
import {
	DomainName,
    JsonSchema,
	SchemaName
} from "@airport/ground-control"
import {
	LastIds
} from "@airport/security-check"

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
	
	initFeatureSchemas(
		schemas: JsonSchema[],
		context: IContext,
		buildSchemas: boolean,
	): Promise<Map<DomainName, Map<SchemaName, LastIds>>>

}