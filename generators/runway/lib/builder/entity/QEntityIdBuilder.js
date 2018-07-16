"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QBuilder_1 = require("../QBuilder");
class QEntityIdBuilder extends QBuilder_1.QCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName) {
        super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
        const idProperties = entity.getIdProperties();
        this.idPropertyBuilders = this.getPropertyBuilders(idProperties);
        this.idRelationBuilders = this.getRelationBuilders(idProperties, false);
    }
    build() {
        const idPropertyData = this.buildPropertyData(this.idPropertyBuilders);
        const idRelationData = this.buildRelationData(this.idRelationBuilders);
        let qName = `Q${this.entity.docEntry.name}`;
        let extendsQType = '';
        if (this.entity.parentEntity) {
            extendsQType = ' extends Q' + this.entity.parentEntity.type + 'QId';
        }
        const classSource = `// Entity Id Interface
export interface ${qName}QId${extendsQType}
{
	
	// Id Fields
${idPropertyData.definitions}
	// Id Relations
${idRelationData.definitions}

}`;
        return classSource;
    }
}
exports.QEntityIdBuilder = QEntityIdBuilder;
//# sourceMappingURL=QEntityIdBuilder.js.map