"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Builder_1 = require("../Builder");
class QEntityRelationBuilder extends Builder_1.QCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName) {
        super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
    }
    build() {
        let qName = `Q${this.entity.docEntry.name}`;
        const isMappedSuperclass = this.entity.docEntry.decorators.some(decorator => {
            return decorator.name === 'MappedSuperclass';
        });
        let genericType = '';
        let parentEntityQType = `IQRelation<${qName}>`;
        if (isMappedSuperclass) {
            genericType = '<SubType extends IQEntity>';
            parentEntityQType = `IQRelation<SubType>`;
        }
        if (this.entity.parentEntity) {
            parentEntityQType = `Q${this.entity.parentEntity.type}QRelation<${qName}>`;
        }
        const classSource = `// Entity Relation Interface
export interface ${qName}QRelation${genericType}
	extends ${parentEntityQType}, ${qName}QId {
}`;
        return classSource;
    }
}
exports.QEntityRelationBuilder = QEntityRelationBuilder;
//# sourceMappingURL=QEntityRelationBuilder.js.map