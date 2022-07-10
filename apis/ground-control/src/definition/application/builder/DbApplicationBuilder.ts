import {
	DbApplication,
	JsonApplication
}                           from "../Application";
import {ILinkingDictionary} from "./LinkingDictionary";

export interface IDbApplicationBuilder {

	buildDbApplicationWithoutReferences(
		jsonApplication: JsonApplication,
		relatedApplications: DbApplication[],
		dictionary: ILinkingDictionary,
	): DbApplication;

	linkDbApplicationsByReferences(
		applicationMap: { [domain: string]: { [name: string]: DbApplication } },
		jsonApplicationMap: { [domain: string]: { [name: string]: JsonApplication } },
		dictionary: ILinkingDictionary,
		failOnMissingMappings: boolean,
	);
}