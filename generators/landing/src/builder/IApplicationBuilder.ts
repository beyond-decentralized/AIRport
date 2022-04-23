import { ISequence } from '@airport/airport-code'
import { IContext } from '@airport/direction-indicator';
import { JsonApplication } from '@airport/ground-control'
import { JsonApplicationWithLastIds } from '@airport/security-check';
import { IApplication } from '@airport/airspace';

export interface IApplicationBuilder {

	build(
		jsonApplication: JsonApplication,
		existingApplicationMap: Map<string, IApplication>,
		newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>,
		context: IContext,
	): Promise<void>

	buildAllSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): Promise<ISequence[]>

	stageSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): ISequence[]

}
