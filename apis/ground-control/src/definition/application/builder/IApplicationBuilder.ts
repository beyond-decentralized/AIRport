import {
	IApplication,
	JsonApplication
}                           from "../IApplication";
import {ILinkingDictionary} from "./ILinkingDictionary";

export interface IApplicationBuilder {

	buildIApplicationWithoutReferences(
		jsonApplication: JsonApplication,
		relatedApplications: IApplication[],
		dictionary: ILinkingDictionary,
	): IApplication;

	linkIApplicationsByReferences(
		applicationMap: { [domain: string]: { [name: string]: IApplication } },
		jsonApplicationMap: { [domain: string]: { [name: string]: JsonApplication } },
		dictionary: ILinkingDictionary,
		failOnMissingMappings: boolean,
	);
}