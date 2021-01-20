import { store } from './schema/store';
import { VespaSchemaGenerator } from './schema/VespaSchemaGenerator';
import { VespaSchemaProcessor } from './schema/VespaSchemaProcessor';
export class VespaProcessor {
    async process() {
        const schemaProcessor = new VespaSchemaProcessor();
        const schemaGenerator = new VespaSchemaGenerator();
        await schemaProcessor.process(store);
        await schemaGenerator.generate(store);
    }
}
//# sourceMappingURL=VespaProcessor.js.map