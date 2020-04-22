"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QRelationBuilder {
    constructor(parentBuilder, entityProperty, entityMapByName, buildRelationInstance) {
        this.parentBuilder = parentBuilder;
        this.entityProperty = entityProperty;
        this.buildRelationInstance = buildRelationInstance;
    }
    buildDefinition() {
        let type;
        let entityType = this.entityProperty.type;
        if (this.entityProperty.entity) {
            entityType = this.entityProperty.entity.type;
        }
        else {
            entityType = this.entityProperty.otherSchemaDbEntity.name;
        }
        entityType = entityType.replace('[]', '');
        type = `Q${entityType}`
            + (this.buildRelationInstance ? 'QRelation' : 'QId');
        if (this.entityProperty.isArray) {
            type = `IQOneToManyRelation<Q${entityType}>`;
        }
        return `${this.entityProperty.name}: ${type};`;
    }
    build() {
        throw new Error(`Not implemented`);
    }
    buildInterfaceDefinition(idOnly, optional = true, forInternalInterfaces = true, forCascadeGraph = false) {
        if (idOnly && this.entityProperty.decorators.filter(decorator => decorator.name === 'OneToMany').length) {
            return null;
        }
        let typeSuffix = '';
        if (forInternalInterfaces) {
            typeSuffix = idOnly ? (optional ? 'EOptionalId' : 'EId') :
                (forCascadeGraph ? 'Graph' : 'ESelect');
        }
        let type = this.entityProperty.type;
        if (this.entityProperty.entity) {
            type = this.entityProperty.entity.type;
        }
        else {
            type = this.entityProperty.otherSchemaDbEntity.name;
        }
        if (forInternalInterfaces) {
            if (!forCascadeGraph) {
                type = type.replace('[]', '');
            }
            else {
                typeSuffix += this.entityProperty.isArray ? '[]' : '';
            }
        }
        else {
            type = 'I' + type;
            if (this.entityProperty.entity && this.entityProperty.isArray) {
                type += '[]';
            }
        }
        const iType = type + typeSuffix;
        const definition = `${this.entityProperty.name}${optional ? '?' : ''}: ${iType};`;
        return definition;
    }
}
exports.QRelationBuilder = QRelationBuilder;
//# sourceMappingURL=QRelationBuilder.js.map