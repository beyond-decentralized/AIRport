import { QCoreEntityBuilder } from "../Builder";
/**
 * Created by Papa on 4/25/2016.
 */
export class QEntityBuilder extends QCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName, sIndexedEntity) {
        super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
        this.sIndexedEntity = sIndexedEntity;
        let idColumns = [];
        if (sIndexedEntity) {
            idColumns = sIndexedEntity.idColumns;
        }
        this.idColumnBuilders = this.getColumnBuilders(idColumns);
        const idProperties = entity.getIdProperties();
        this.idPropertyBuilders = this.getPropertyBuilders(idProperties);
        this.idRelationBuilders = this.getRelationBuilders(idProperties, true);
        let nonIdColumns = [];
        if (sIndexedEntity) {
            nonIdColumns = sIndexedEntity.columns.filter((column) => {
                if (idColumns.some(idColumn => column.name === idColumn.name)) {
                    return false;
                }
                return true;
            });
        }
        this.nonIdColumnBuilders = this.getColumnBuilders(nonIdColumns);
        const nonIdProperties = entity.getNonIdProperties();
        this.nonIdPropertyBuilders = this.getPropertyBuilders(nonIdProperties);
        this.nonIdRelationBuilders = this.getRelationBuilders(nonIdProperties, true);
        this.transientPropertyBuilders = this.getTransientPropertyBuilders(entity.getTransientProperties());
    }
    build() {
        const idPropertyData = this.buildPropertyData(this.idPropertyBuilders);
        const nonIdPropertyData = this.buildPropertyData(this.nonIdPropertyBuilders);
        const nonIdRelationData = this.buildRelationData(this.nonIdRelationBuilders);
        const idRelationData = this.buildRelationData(this.idRelationBuilders);
        let parentEntityQType = 'IQEntity';
        if (this.entity.parentEntity) {
            parentEntityQType = 'Q' + this.entity.parentEntity.type;
        }
        let qName = `Q${this.entity.docEntry.name}`;
        let classSource = `/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface ${qName} extends ${parentEntityQType}
{
	// Id Fields
${idPropertyData.definitions}
	// Id Relations
${idRelationData.definitions}
	// Non-Id Fields
${nonIdPropertyData.definitions}
	// Non-Id Relations
${nonIdRelationData.definitions}
}
`;
        return classSource;
    }
}
//# sourceMappingURL=QEntityBuilder.js.map