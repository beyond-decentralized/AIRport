import { IAirportDatabase } from "@airport/air-control";
import { IDdlObjectLinker } from "./DdlObjectLinker";
import { AllDdlObjects } from "./DllObjects";
import { IQueryEntityClassCreator } from "./QueryEntityClassCreator";
import { ITerminalStore } from "../store/TerminalStore";

export interface IQueryObjectInitializer {

	initialize(
		airDb: IAirportDatabase
	): Promise<AllDdlObjects>

	generateQObjectsAndPopulateStore(
		allDdlObjects: AllDdlObjects,
		airDb: IAirportDatabase,
		ddlObjectLinker: IDdlObjectLinker,
		queryEntityClassCreator: IQueryEntityClassCreator,
		terminalStore: ITerminalStore
	): void

}