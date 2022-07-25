import { VCoreEntityBuilder } from "./VCoreEntityBuilder";
/**
 * Created by Papa on 4/25/2016.
 */
export class VEntityBuilder extends VCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName, sIndexedEntity) {
        super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
        this.sIndexedEntity = sIndexedEntity;
        const idProperties = entity.getIdProperties();
        this.idPropertyBuilders = this.getVPropertyBuilders(idProperties);
        this.idRelationBuilders = this.getVRelationBuilders(idProperties, true);
        const nonIdProperties = entity.getNonIdProperties();
        this.nonIdPropertyBuilders = this.getVPropertyBuilders(nonIdProperties);
        this.nonIdRelationBuilders = this.getVRelationBuilders(nonIdProperties, true);
        this.transientPropertyBuilders = this.getVTransientPropertyBuilders(entity.getTransientProperties());
    }
    build() {
        const idPropertyData = this.buildPropertyData(this.idPropertyBuilders);
        const nonIdPropertyData = this.buildPropertyData(this.nonIdPropertyBuilders);
        const nonIdRelationData = this.buildRelationData(this.nonIdRelationBuilders);
        const idRelationData = this.buildRelationData(this.idRelationBuilders);
        let parentEntityQType = 'IVEntity';
        if (this.entity.parentEntity) {
            parentEntityQType = 'V' + this.entity.parentEntity.type;
        }
        let vName = `V${this.entity.docEntry.name}`;
        let interfaceGenericAndExtends;
        if (this.entity.docEntry.isMappedSuperclass) {
            interfaceGenericAndExtends = ` extends ${parentEntityQType}`;
        }
        else {
            interfaceGenericAndExtends = ` extends ${parentEntityQType}`;
        }
        let classSource = `/**
 * Validation Entity Definition (used for V.ApplicationEntity_Name).
 */
export interface ${vName}${interfaceGenericAndExtends}
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
//# sourceMappingURL=VEntityBuilder.js.map