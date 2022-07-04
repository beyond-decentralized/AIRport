import { store } from './application/store';
import { VespaApplicationGenerator } from './application/VespaApplicationGenerator';
import { VespaApplicationProcessor } from './application/VespaApplicationProcessor';
export class VespaProcessor {
    async process() {
        const applicationProcessor = new VespaApplicationProcessor();
        const applicationGenerator = new VespaApplicationGenerator();
        await applicationProcessor.process(store);
        await applicationGenerator.generate(store);
    }
}
//# sourceMappingURL=VespaProcessor.js.map