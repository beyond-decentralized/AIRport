import { JsonApplicationWithApi } from "@airport/air-traffic-control"
import { ApplicationReferenceUtils, AppTrackerUtils, Dictionary, JsonApplication, JsonRelation, JsonApplicationVersion } from "@airport/ground-control"
import { SIndexedApplication } from "./SApplication"

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
                queryRelation: JsonRelation
            ) => {
                let relatedJsonApplication
                let relatedJsonEntity
                if (queryRelation.relationTableApplication_Index
                    || queryRelation.relationTableApplication_Index === 0) {
                    const referencedApplication = jsonApplicationVersion
                        .referencedApplications[queryRelation.relationTableApplication_Index]

                    // References are by name only since they are loaded from source by name
                    // thus a given Applicaiton shouldn't be referencing two other applications
                    // with the same names
                    relatedJsonApplication = indexedApplication.referencedApplicationsByName[referencedApplication.name].dbApplication

                    const relatedApplicationVersion = relatedJsonApplication
                        .versions[relatedJsonApplication.versions.length - 1]
                    relatedJsonEntity = relatedApplicationVersion.entities[queryRelation.relationTableIndex]
                } else {
                    relatedJsonApplication = jsonApplication
                    relatedJsonEntity = jsonApplicationVersion.entities[queryRelation.relationTableIndex]
                }

                return {
                    relatedJsonApplication,
                    relatedJsonEntity
                }
            }
        )
    }

}
