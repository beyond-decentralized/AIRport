import { JsonApplicationWithApi } from "@airport/check-in";
import { ApplicationReferenceUtils, AppTrackerUtils, Dictionary, JsonApplication, JsonApplicationRelation, JsonApplicationVersion } from "@airport/ground-control";
import { SIndexedApplication } from "./SApplication";

export interface IJsonApplicationChecker {

    checkFrameworkReferences(
        jsonApplication: JsonApplicationWithApi,
        indexedApplication: SIndexedApplication
    ): void

}

export class JsonApplicationChecker
    implements IJsonApplicationChecker {

    applicationReferenceChecker: ApplicationReferenceUtils

    constructor() {
        this.applicationReferenceChecker = new ApplicationReferenceUtils()
        this.applicationReferenceChecker.appTrackerUtils = new AppTrackerUtils();
        (this.applicationReferenceChecker.appTrackerUtils as AppTrackerUtils).dictionary = new Dictionary()
    }

    checkFrameworkReferences(
        jsonApplication: JsonApplicationWithApi,
        indexedApplication: SIndexedApplication
    ): void {
        this.applicationReferenceChecker.checkFrameworkReferences(
            jsonApplication,
            (
                jsonApplication: JsonApplication,
                jsonApplicationVersion: JsonApplicationVersion,
                jsonRelation: JsonApplicationRelation
            ) => {
                let relatedJsonApplication
                let relatedJsonEntity
                if (jsonRelation.relationTableApplication_Index
                    || jsonRelation.relationTableApplication_Index === 0) {
                    const referencedApplication = jsonApplicationVersion
                        .referencedApplications[jsonRelation.relationTableApplication_Index]

                    // References are by name only since they are loaded from source by name
                    // thus a given Applicaiton shouldn't be referencing two other applications
                    // with the same names
                    relatedJsonApplication = indexedApplication.referencedApplicationsByName[referencedApplication.name].dbApplication

                    const relatedApplicationVersion = relatedJsonApplication
                        .versions[relatedJsonApplication.versions.length - 1]
                    relatedJsonEntity = relatedApplicationVersion.entities[jsonRelation.relationTableIndex]
                } else {
                    relatedJsonApplication = jsonApplication
                    relatedJsonEntity = jsonApplicationVersion.entities[jsonRelation.relationTableIndex]
                }

                return {
                    relatedJsonApplication,
                    relatedJsonEntity
                }
            }
        )
    }

}
