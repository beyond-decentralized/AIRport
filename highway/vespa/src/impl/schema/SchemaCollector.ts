export interface ISchemaCollector {

	collect(): Promise<string[]>
}

export class SchemaCollector
	implements ISchemaCollector {

	async collect(): Promise<string[]> {
		return [];
	}
}
