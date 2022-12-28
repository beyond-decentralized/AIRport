import { Inject, Injected } from "@airport/direction-indicator";
import { DbApplication, DbDomain, DbEntity, JsonApplication, JsonApplicationColumn, JsonApplicationEntity, JsonApplicationProperty, JsonApplicationRelation, JsonApplicationVersion } from "@airport/ground-control";
import { IApplicationLocator } from "../locator/ApplicationLocator";

interface IApplicationEntityDescriptor {
    application: string
    entities: IEntityDescriptor[]
}

export interface IEntityDescriptor {
    entity: string
    relations: IRelationDescriptor[]
}

export interface IRelationDescriptor {
    column: string
    property?: string
}

export interface IApplicationReferenceChecker {

    applicationLocator: IApplicationLocator

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

@Injected()
export class ApplicationReferenceChecker
    implements IApplicationReferenceChecker {

    @Inject()
    applicationLocator: IApplicationLocator

    applicationEntityDescriptors: IApplicationEntityDescriptor[] = [{
        application: '@airport/holding-pattern',
        entities: [{
            entity: 'Actor',
            relations: [{
                column: 'ACTOR_LID',
                property: 'actor'
            }, {
                column: 'ACTOR_LID',
                property: 'sourceActor'
            }, {
                column: 'GUID'
            }]
        }, {
            entity: 'Repository',
            relations: [{
                column: 'REPOSITORY_LID',
                property: 'repository'
            }, {
                column: 'REPOSITORY_LID',
                property: 'sourceRepository'
            }, {
                column: 'GUID'
            }]
        }]
    }, {
        application: '@airport/travel-document-checkpoint',
        entities: [{
            entity: 'UserAccount',
            relations: [{
                column: 'GUID'
            }]
        }]
    }
    ]

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
        if (jsonApplication.domain === 'airport') {
            return
        }
        const applicationVersion = this.applicationLocator.getCurrentJsonApplicationVersion(jsonApplication)

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
        if ((typeof domain === 'string' && domain !== 'airport')
            || (typeof domain === 'object' && (domain as DbDomain).name !== 'airport')) {
            return false
        }

        let foundValidFrameworkRelation = false
        VALID_FRAMEWORK_RELATION_SEARCH:
        for (const applicationEntityDescriptor of this.applicationEntityDescriptors) {
            if (relatedJsonApplication.name !== applicationEntityDescriptor.application) {
                continue
            }
            for (const entityDescriptor of applicationEntityDescriptor.entities) {
                if (relatedJsonEntity.name !== entityDescriptor.entity) {
                    continue
                }
                for (const relationDescriptor of entityDescriptor.relations) {
                    if (relationDescriptor.property && jsonProperty.name !== relationDescriptor.property) {
                        continue
                    }
                    // All non @Id AIR entity references 
                    const manyRelationColumnRef = jsonColumn.manyRelationColumnRefs[0]
                    const relatedColumn = relatedJsonEntity.columns[manyRelationColumnRef.oneColumnIndex]
                    if (relatedColumn.name !== relationDescriptor.column) {
                        continue
                    }

                    foundValidFrameworkRelation = true
                    break VALID_FRAMEWORK_RELATION_SEARCH
                }
            }
        }

        if (!foundValidFrameworkRelation) {
            throw new Error(`Found an invalid reference to an internal schema:
Referencing:
  Domain:   ${typeof relatedJsonApplication.domain === 'string' ? relatedJsonApplication.domain : relatedJsonApplication.domain}
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