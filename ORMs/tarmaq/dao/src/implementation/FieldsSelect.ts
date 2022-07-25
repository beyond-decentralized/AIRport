import { DbEntity, EntityRelationType } from "@airport/ground-control";
import { IEntitySelectProperties, Y } from "@airport/tarmaq-query";
import { IFieldsSelect } from "../definition/IFieldsSelect";

export class FieldsSelect<EntitySelect extends IEntitySelectProperties>
    implements IFieldsSelect<EntitySelect> {

    constructor(
        public dbEntity: DbEntity
    ) {
    }

    get ids(): EntitySelect {
        const propertyNames = this.dbEntity.properties
            .filter(
                property => property.isId)
            .map(
                property => property.name);

        return this.getSelect(propertyNames, false);
    }

    get fields(): EntitySelect {
        const propertyNames = this.dbEntity.properties
            .filter(
                property => !property.relation || !property.relation.length)
            .map(
                property => property.name);

        return this.getSelect(propertyNames, false);
    }

    get manyToOnes(): EntitySelect {
        return this.getRelationSelect(EntityRelationType.MANY_TO_ONE);
    }

    get oneToManys(): EntitySelect {
        return this.getRelationSelect(EntityRelationType.ONE_TO_MANY);
    }

    private getRelationSelect(
        relationType: EntityRelationType,
    ): EntitySelect {
        const propertyNames = this.dbEntity.properties
            .filter(
                property => property.relation
                    && property.relation.length
                    && property.relation[0].relationType === relationType)
            .map(
                property => property.name);

        return this.getSelect(propertyNames, true);
    }

    private getSelect(
        propertyNames: string[],
        forRelations: boolean,
    ): EntitySelect {
        const selectFragment = {};

        for (const propertyName of propertyNames) {
            selectFragment[propertyName] = forRelations ? {} : Y;
        }

        return selectFragment as any;
    }

}