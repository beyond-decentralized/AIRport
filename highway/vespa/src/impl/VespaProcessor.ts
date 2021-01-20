import { store }                from './schema/store';
import { VespaSchemaGenerator } from './schema/VespaSchemaGenerator';
import { VespaSchemaProcessor } from './schema/VespaSchemaProcessor';

export interface IVespaProcessor {

	process(): Promise<void>;

}

export class VespaProcessor
	implements IVespaProcessor {

	async process(): Promise<void> {
		const schemaProcessor = new VespaSchemaProcessor();
		const schemaGenerator = new VespaSchemaGenerator();

		await schemaProcessor.process(store);
		await schemaGenerator.generate(store);
	}

}
