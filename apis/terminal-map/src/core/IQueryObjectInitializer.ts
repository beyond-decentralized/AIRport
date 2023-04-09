import { IContext } from "@airport/direction-indicator";
import { AllDdlObjects } from "./DllObjects";

export interface IQueryObjectInitializer {

	initialize(
		context: IContext
	): Promise<AllDdlObjects>

	generateQObjectsAndPopulateStore(
		allDdlObjects: AllDdlObjects
	): void

}
