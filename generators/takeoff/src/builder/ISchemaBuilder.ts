import { JsonApplicationWithLastIds } from '@airport/air-traffic-control';
import { IContext } from '@airport/direction-indicator';
import { IApplication, DbSequence, JsonApplication } from '@airport/ground-control'

export interface ISchemaBuilder {

	build(
		jsonApplication: JsonApplication,
		existingApplicationMap: Map<string, IApplication>,
		newJsonApplicationMap: Map<string, JsonApplicationWithLastIds>,
		isFeatureApp: boolean,
		context: IContext,
	): Promise<void>

	buildAllSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): Promise<DbSequence[]>

	stageSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): DbSequence[]

}
