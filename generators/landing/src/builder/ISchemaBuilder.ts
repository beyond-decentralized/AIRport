import { JsonApplicationWithLastIds } from '@airport/air-traffic-control';
import { IContext } from '@airport/direction-indicator';
import { DbApplication, DbSequence, JsonApplication } from '@airport/ground-control'

export interface ISchemaBuilder {

	build(
		jsonApplication: JsonApplication,
		existingApplicationMap: Map<string, DbApplication>,
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
