import {
	DbApplication,
	JsonApplication
}                           from "../DbApplication";
import {ILinkingDictionary} from "./ILinkingDictionary";

export interface DbApplicationBuilder {

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