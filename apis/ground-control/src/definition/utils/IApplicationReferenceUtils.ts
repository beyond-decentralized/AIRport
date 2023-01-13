import { JsonApplication, JsonApplicationVersion } from "../application/Application"
import { JsonApplicationEntity } from "../application/Entity"
import { JsonApplicationRelation } from "../application/Property"

export interface IApplicationReferenceUtils {

    getCurrentJsonApplicationVersion(
        jsonApplication: JsonApplication
    ): JsonApplicationVersion

    checkFrameworkReferences(
        jsonApplication: JsonApplication,
        getRelationInfo: (
            jsonApplication: JsonApplication,
            applicationVersion: JsonApplicationVersion,
            jsonRelation: JsonApplicationRelation
        ) => {
            relatedJsonApplication: JsonApplication,
            relatedJsonEntity: JsonApplicationEntity
        }
    ): void

}
