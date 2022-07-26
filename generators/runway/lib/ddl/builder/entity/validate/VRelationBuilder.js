import { entityExtendsOrIsAirEntity } from '../../application/SApplicationBuilder';
export class VRelationBuilder {
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
            entityType = this.entityProperty.otherApplicationDbEntity.name;
        }
        entityType = entityType.replace('[]', '');
        type = `V${entityType}`
            + (this.buildRelationInstance ? 'VRelation' : 'VId');
        if (this.entityProperty.isArray) {
            let interfaceName = 'IVOneToManyRelation';
            if (entityExtendsOrIsAirEntity(this.parentBuilder.entity)[0]) {
                interfaceName = 'IVAirEntityOneToManyRelation';
                type = `${interfaceName}<I${entityType}, V${entityType}>`;
            }
            else {
                type = `${interfaceName}<V${entityType}>`;
            }
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
            // typeSuffix = idOnly ? (optional ? 'EOptionalId' : 'EId') :
            // 	(forCascadeGraph ? 'Graph' : 'ESelect')
            typeSuffix = 'VDescriptor';
        }
        let type = this.entityProperty.type;
        if (this.entityProperty.entity) {
            type = this.entityProperty.entity.type;
        }
        else {
            type = this.entityProperty.otherApplicationDbEntity.name;
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
//# sourceMappingURL=VRelationBuilder.js.map