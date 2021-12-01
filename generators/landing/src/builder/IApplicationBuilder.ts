import { IAirportDatabase } from '@airport/air-control'
import { ISequence } from '@airport/airport-code'
import { IContext } from '@airport/di';
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
		airDb: IAirportDatabase,
		context: IContext,
	): ISequence[]

}
