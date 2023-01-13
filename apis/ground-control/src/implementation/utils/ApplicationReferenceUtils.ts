import { Inject, Injected } from "@airport/direction-indicator";
import { DbApplication, DbDomain, JsonApplication, JsonApplicationVersion } from "../../definition/application/Application";
import { DbEntity, JsonApplicationEntity } from "../../definition/application/Entity";
import { JsonApplicationColumn, JsonApplicationProperty, JsonApplicationRelation } from "../../definition/application/Property";
import { IApplicationReferenceUtils } from "../../definition/utils/IApplicationReferenceUtils";
import { IAppTrackerUtils } from "../../definition/utils/IAppTrackerUtils";

@Injected()
export class ApplicationReferenceUtils
    implements IApplicationReferenceUtils {

    @Inject()
    appTrackerUtils: IAppTrackerUtils

    getCurrentJsonApplicationVersion(
        jsonApplication: JsonApplication
    ): JsonApplicationVersion {
        return jsonApplication.versions[jsonApplication.versions.length - 1]
    }

    checkFrameworkReferences(
        jsonApplication: JsonApplication,
        getRelationInfo: (
            jsonApplication: JsonApplication,
            applicationVersion: JsonApplicationVersion,
            jsonRelation: JsonApplicationRelation
        ) => {
            relatedJsonApplication: JsonApplication | DbApplication,
            relatedJsonEntity: JsonApplicationEntity | DbEntity
        }
    ): void {
        if (this.appTrackerUtils.isInternalDomain(jsonApplication.domain)) {
            return
        }
        const applicationVersion = this.getCurrentJsonApplicationVersion(jsonApplication)

        for (const jsonEntity of applicationVersion.entities) {

            for (const jsonColumn of jsonEntity.columns) {
                // If it's not a many relation, include it in the generated columns
                if (!jsonColumn.manyRelationColumnRefs
                    || !jsonColumn.manyRelationColumnRefs.length) {
                    continue
                }
                const relations = this.getRelationsFromColumn(jsonEntity, jsonColumn);
                for (let jsonRelation of relations) {
                    const {
                        relatedJsonApplication, relatedJsonEntity
                    } = getRelationInfo(jsonApplication, applicationVersion,
                        jsonRelation)
                    this.isRelationToAFrameworkEntity(
                        relatedJsonApplication,
                        relatedJsonEntity,
                        jsonApplication,
                        jsonEntity,
                        jsonEntity.properties[jsonRelation.propertyRef.index],
                        jsonColumn
                    )
                }
            }
        }
    }

    private getRelationsFromColumn(
        jsonEntity: JsonApplicationEntity,
        jsonColumn: JsonApplicationColumn
    ): JsonApplicationRelation[] {
        let relationSet: Set<JsonApplicationRelation> = new Set()
        for (let propertyRef of jsonColumn.propertyRefs) {
            let property = jsonEntity.properties[propertyRef.index]
            if (property.relationRef) {
                let relation = jsonEntity.relations[property.relationRef.index]
                if (!relationSet.has(relation)) {
                    relationSet.add(relation)
                }
            }
        }

        return Array.from(relationSet.values())
    }

    private isRelationToAFrameworkEntity(
        relatedJsonApplication: JsonApplication | DbApplication,
        relatedJsonEntity: JsonApplicationEntity | DbEntity,
        jsonApplication: JsonApplication,
        jsonEntity: JsonApplicationEntity,
        jsonProperty: JsonApplicationProperty,
        jsonColumn: JsonApplicationColumn
    ) {
        const domain: string | DbDomain = relatedJsonApplication.domain
        const domainName = typeof domain === 'string' ? domain : (domain as DbDomain).name
        // All non @Id AIR entity references 
        const manyRelationColumnRef = jsonColumn.manyRelationColumnRefs[0]
        const relatedColumn = relatedJsonEntity.columns[manyRelationColumnRef.oneColumnIndex]

        if (!this.appTrackerUtils.entityHasExternalAccessPermissions(
            domainName,
            relatedJsonApplication.name,
            relatedJsonApplication.versions[0].integerVersion,
            relatedJsonEntity.name,
            relatedColumn.name
        )) {
            throw new Error(`Found an invalid reference to an internal schema:
Referencing:
  Domain:   ${typeof relatedJsonApplication.domain === 'string' ? relatedJsonApplication.domain : relatedJsonApplication.domain.name}
  App:      ${relatedJsonApplication.name}
  Entity:   ${relatedJsonEntity.name}

From:
  Domain:   ${jsonApplication.domain}
  App:      ${jsonApplication.name}
  Entity:   ${jsonEntity.name}
  Property: ${jsonProperty.name}
          
          `)
        }

        return true
    }

}