import { JsonApplication, JsonApplicationVersion } from "../application/IApplication"
import { JsonEntity } from "../application/DbEntity"
import { JsonRelation } from "../application/DbProperty"

export interface IApplicationReferenceUtils {

    getCurrentJsonApplicationVersion(
        jsonApplication: JsonApplication
    ): JsonApplicationVersion

    checkFrameworkReferences(
        jsonApplication: JsonApplication,
        getRelationInfo: (
            jsonApplication: JsonApplication,
            applicationVersion: JsonApplicationVersion,
            queryRelation: JsonRelation
        ) => {
            relatedJsonApplication: JsonApplication,
            relatedJsonEntity: JsonEntity
        }
    ): void

}
