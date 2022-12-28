import { JsonApplicationWithApi } from "@airport/check-in";
import { JsonApplication, JsonApplicationRelation, JsonApplicationVersion } from "@airport/ground-control";
import { ApplicationLocator, ApplicationReferenceChecker, IApplicationReferenceChecker } from "@airport/landing";
import { SIndexedApplication } from "./SApplication";

export interface IJsonApplicationChecker {

    checkFrameworkReferences(
        jsonApplication: JsonApplicationWithApi,
        indexedApplication: SIndexedApplication
    ): void

}

export class JsonApplicationChecker
    implements IJsonApplicationChecker {

    applicationReferenceChecker: IApplicationReferenceChecker

    constructor() {
        this.applicationReferenceChecker = new ApplicationReferenceChecker()
        this.applicationReferenceChecker.applicationLocator = new ApplicationLocator()
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
