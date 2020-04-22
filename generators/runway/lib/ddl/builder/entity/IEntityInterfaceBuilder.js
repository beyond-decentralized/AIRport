"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../../../resolve/pathResolver");
const SSchemaBuilder_1 = require("../schema/SSchemaBuilder");
/**
 * Created by Papa on 5/20/2016.
 */
class IEntityInterfaceBuilder {
    constructor(entity, qEntityBuilder) {
        this.entity = entity;
        this.qEntityBuilder = qEntityBuilder;
        this.idPropertyBuilders = qEntityBuilder.idPropertyBuilders;
        this.idRelationBuilders = qEntityBuilder.idRelationBuilders;
        this.nonIdPropertyBuilders = qEntityBuilder.nonIdPropertyBuilders;
        this.nonIdRelationBuilders = qEntityBuilder.nonIdRelationBuilders;
        this.transientPropertyBuilders = qEntityBuilder.transientPropertyBuilders;
    }
    build() {
        let entityName = `${this.entity.docEntry.name}`;
        let idProperties = ``;
        this.idPropertyBuilders.forEach((builder) => {
            idProperties += `\t${builder.buildInterfaceDefinition(false, false)}\n`;
        });
        let idRelations = ``;
        this.idRelationBuilders.forEach((builder) => {
            const idRelation = builder.buildInterfaceDefinition(true, false, false);
            if (idRelation) {
                idRelations += `\t${idRelation}\n`;
            }
        });
        let nonIdProperties = ``;
        this.nonIdPropertyBuilders.forEach((builder) => {
            nonIdProperties += `\t${builder.buildInterfaceDefinition(true, false)}\n`;
        });
        let nonIdRelations = ``;
        this.nonIdRelationBuilders.forEach((builder) => {
            const nonIdRelation = builder.buildInterfaceDefinition(false, true, false);
            if (nonIdRelation) {
                nonIdRelations += `\t${nonIdRelation}\n`;
            }
        });
        const [isRepositoryEntity, isLocal] = SSchemaBuilder_1.entityExtendsRepositoryEntity(this.entity);
        let transientProperties = ``;
        this.transientPropertyBuilders.forEach((builder) => {
            transientProperties += `\t${builder.buildInterfaceDefinition()}\n`;
        });
        let entityExtendsClause = '';
        if (this.entity.parentEntity) {
            const parentType = this.entity.parentEntity.type;
            entityExtendsClause = ` extends I${parentType}`;
        }
        const publicMethodSignatures = this.entity.docEntry.methodSignatures
            .map(method => {
            let methodParams = method.parameters.map(paramDocEntry => {
                const optional = paramDocEntry.optional ? '?' : '';
                return `\t\t${paramDocEntry.name}${optional}: ${this.getTypeString(paramDocEntry)}`;
            }).join(',\n');
            methodParams = methodParams ? `\n${methodParams}\n\t` : '';
            return `\t${method.name}?(${methodParams}): ${this.getTypeString(method.returnType)};`;
        }).join('\n');
        let interfaceSource = `
//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface I${entityName}${entityExtendsClause} {
	
	// Id Properties
${idProperties}
	// Id Relations
${idRelations}
	// Non-Id Properties
${nonIdProperties}
	// Non-Id Relations
${nonIdRelations}
	// Transient Properties
${transientProperties}
	// Public Methods
${publicMethodSignatures}	
}

`;
        return interfaceSource;
    }
    getTypeString(docEntry) {
        let type = docEntry.type;
        let suffix = '';
        if (docEntry.arrayDepth) {
            for (let i = 0; i < docEntry.arrayDepth; i++) {
                suffix += '[]';
            }
        }
        if (docEntry.primitive) {
            return type + suffix;
        }
        if (type === 'void') {
            return type;
        }
        if (type === 'Date' || type === 'any') {
            return type + suffix;
        }
        if (type !== 'Promise') {
            pathResolver_1.addImportForType(this.entity, type, this.qEntityBuilder.fileBuilder);
        }
        if (docEntry.genericParams.length) {
            suffix = '<' + docEntry.genericParams.map(genericParam => this.getTypeString(genericParam)).join(', ') + '>' + suffix;
        }
        return type + suffix;
    }
}
exports.IEntityInterfaceBuilder = IEntityInterfaceBuilder;
//# sourceMappingURL=IEntityInterfaceBuilder.js.map