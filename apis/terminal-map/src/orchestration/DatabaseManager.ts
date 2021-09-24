import {
    IContext
} from "@airport/di"
import {
	DomainName,
    JsonSchema,
	SchemaName
} from "@airport/ground-control"
import {
	JsonSchemaWithLastIds
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
		...schemas: JsonSchemaWithLastIds[]
	): Promise<void>;

	initNoDb(
		context: IContext,
		...schemas: JsonSchemaWithLastIds[]
	): Promise<void>
	
	initFeatureSchemas(
		schemas: JsonSchemaWithLastIds[],
		context: IContext,
		buildSchemas: boolean,
	): void

}