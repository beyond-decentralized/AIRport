import { QCoreEntityBuilder } from "./QCoreEntityBuilder";
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
        this.idColumnBuilders = this.getQColumnBuilders(idColumns);
        const idProperties = entity.getIdProperties();
        this.idPropertyBuilders = this.getQPropertyBuilders(idProperties);
        this.idRelationBuilders = this.getQRelationBuilders(idProperties, true);
        let nonIdColumns = [];
        if (sIndexedEntity) {
            nonIdColumns = sIndexedEntity.columns.filter((column) => {
                if (idColumns.some(idColumn => column.name === idColumn.name)) {
                    return false;
                }
                return true;
            });
        }
        this.nonIdColumnBuilders = this.getQColumnBuilders(nonIdColumns);
        const nonIdProperties = entity.getNonIdProperties();
        this.nonIdPropertyBuilders = this.getQPropertyBuilders(nonIdProperties);
        this.nonIdRelationBuilders = this.getQRelationBuilders(nonIdProperties, true);
        this.transientPropertyBuilders = this.getQTransientPropertyBuilders(entity.getTransientProperties());
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
        let interfaceGenericAndExtends;
        if (this.entity.docEntry.isMappedSuperclass) {
            interfaceGenericAndExtends = ` extends ${parentEntityQType}`;
        }
        else {
            interfaceGenericAndExtends = ` extends ${parentEntityQType}`;
        }
        let classSource = `/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface ${qName}${interfaceGenericAndExtends}
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