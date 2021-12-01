import { store }                from './application/store';
import { VespaApplicationGenerator } from './application/VespaApplicationGenerator';
import { VespaApplicationProcessor } from './application/VespaApplicationProcessor';

export interface IVespaProcessor {

	process(): Promise<void>;

}

export class VespaProcessor
	implements IVespaProcessor {

	async process(): Promise<void> {
		const applicationProcessor = new VespaApplicationProcessor();
		const applicationGenerator = new VespaApplicationGenerator();

		await applicationProcessor.process(store);
		await applicationGenerator.generate(store);
	}

}
