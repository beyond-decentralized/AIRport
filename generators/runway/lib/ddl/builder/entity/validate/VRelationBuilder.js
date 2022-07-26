export class VRelationBuilder {
    constructor(parentBuilder, entityProperty) {
        this.parentBuilder = parentBuilder;
        this.entityProperty = entityProperty;
    }
    build() {
        throw new Error(`Not Used`);
    }
    buildInterfaceDefinition() {
        let typeSuffix = 'VDescriptor';
        let type = this.entityProperty.type;
        if (this.entityProperty.entity) {
            type = this.entityProperty.entity.type;
        }
        else {
            type = this.entityProperty.otherApplicationDbEntity.name;
        }
        type = type.replace('[]', '');
        const descriptorType = type + typeSuffix;
        const definition = `${this.entityProperty.name}?: ${descriptorType}<${type}>`;
        return definition;
    }
}
//# sourceMappingURL=VRelationBuilder.js.map