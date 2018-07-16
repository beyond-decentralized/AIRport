import {
	DbSchema,
	JsonSchema
}                           from "../Schema";
import {ILinkingDictionary} from "./LinkingDictionary";

export interface IDbSchemaBuilder {

	buildDbSchemaWithoutReferences(
		jsonSchema: JsonSchema,
		relatedSchemas: DbSchema[],
		dictionary: ILinkingDictionary,
	): DbSchema;

	linkDbSchemasByReferences(
		schemaMap: { [domain: string]: { [name: string]: DbSchema } },
		jsonSchemaMap: { [domain: string]: { [name: string]: JsonSchema } },
		dictionary: ILinkingDictionary,
		failOnMissingMappings: boolean,
	);
}