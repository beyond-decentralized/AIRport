import { VCoreEntityBuilder } from "./VCoreEntityBuilder";
export class VEntityIdBuilder extends VCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName) {
        super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
        const idProperties = entity.getIdProperties();
        this.idPropertyBuilders = this.getVPropertyBuilders(idProperties);
        this.idRelationBuilders = this.getVRelationBuilders(idProperties, false);
    }
    build() {
        const idPropertyData = this.buildPropertyData(this.idPropertyBuilders);
        const idRelationData = this.buildRelationData(this.idRelationBuilders);
        let vName = `V${this.entity.docEntry.name}`;
        let extendsVType = '';
        if (this.entity.parentEntity) {
            extendsVType = ' extends V' + this.entity.parentEntity.type + 'VId';
        }
        const classSource = `// Entity Id Interface
export interface ${vName}VId${extendsVType}
{
	
	// Id Fields
${idPropertyData.definitions}
	// Id Relations
${idRelationData.definitions}

}`;
        return classSource;
    }
}
//# sourceMappingURL=VEntityIdBuilder.js.map