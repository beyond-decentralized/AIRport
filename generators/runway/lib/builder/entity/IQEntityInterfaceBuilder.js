"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolver_1 = require("../../resolve/pathResolver");
const SSchemaBuilder_1 = require("../schema/SSchemaBuilder");
/**
 * Created by Papa on 5/20/2016.
 */
class IQEntityInterfaceBuilder {
    constructor(entity, qEntityBuilder) {
        this.entity = entity;
        this.qEntityBuilder = qEntityBuilder;
        this.idPropertyBuilders = qEntityBuilder.idPropertyBuilders;
        this.idRelationBuilders = qEntityBuilder.idRelationBuilders;
        this.nonIdColumnBuilders = qEntityBuilder.nonIdColumnBuilders;
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
        let idEProperties = ``;
        this.idPropertyBuilders.forEach((builder) => {
            idEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`;
        });
        let optionalIdEProperties = ``;
        this.idPropertyBuilders.forEach((builder) => {
            optionalIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`;
        });
        let idRelations = ``;
        this.idRelationBuilders.forEach((builder) => {
            const idRelation = builder.buildInterfaceDefinition(true, false, false);
            if (idRelation) {
                idRelations += `\t${idRelation}\n`;
            }
        });
        let idRelationsEntityIdEProperties = ``;
        this.idRelationBuilders.forEach((builder) => {
            const idRelationsEntityIdProperty = builder.buildInterfaceDefinition(true, false);
            if (idRelationsEntityIdProperty) {
                idRelationsEntityIdEProperties += `\t${idRelationsEntityIdProperty}\n`;
            }
        });
        let optionalIdRelationsEntityIdEProperties = ``;
        this.idRelationBuilders.forEach((builder) => {
            const idRelationsEntityIdProperty = builder.buildInterfaceDefinition(true);
            if (idRelationsEntityIdProperty) {
                optionalIdRelationsEntityIdEProperties += `\t${idRelationsEntityIdProperty}\n`;
            }
        });
        let idRelationsForEntityEProperties = ``;
        this.idRelationBuilders.forEach((builder) => {
            idRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`;
        });
        let nonIdProperties = ``;
        this.nonIdPropertyBuilders.forEach((builder) => {
            nonIdProperties += `\t${builder.buildInterfaceDefinition(true, false)}\n`;
        });
        let nonIdEProperties = ``;
        this.nonIdPropertyBuilders.forEach((builder) => {
            nonIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`;
        });
        let nonIdEColumns = ``;
        this.nonIdColumnBuilders.forEach((builder) => {
            nonIdEColumns += `\t${builder.buildInterfaceDefinition()}\n`;
        });
        let nonIdRelations = ``;
        this.nonIdRelationBuilders.forEach((builder) => {
            const nonIdRelation = builder.buildInterfaceDefinition(false, true, false);
            if (nonIdRelation) {
                nonIdRelations += `\t${nonIdRelation}\n`;
            }
        });
        let nonIdRelationsForUpdateEProperties = ``;
        this.nonIdRelationBuilders.forEach((builder) => {
            const nonIdRelationForUpdateProperties = builder.buildInterfaceDefinition(true);
            if (nonIdRelationForUpdateProperties) {
                nonIdRelationsForUpdateEProperties += `\t${nonIdRelationForUpdateProperties}\n`;
            }
        });
        let nonIdRelationsForEntityEProperties = ``;
        this.nonIdRelationBuilders.forEach((builder) => {
            nonIdRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`;
        });
        const [isRepositoryEntity, isLocal] = SSchemaBuilder_1.entityExtendsRepositoryEntity(this.entity);
        let relationsForCascadeGraph = ``;
        if (!isRepositoryEntity) {
            this.idRelationBuilders.forEach((builder) => {
                if (SSchemaBuilder_1.getManyToOneDecorator(builder.entityProperty)) {
                    // Do NOT cascade @ManyToOne's
                    return;
                }
                relationsForCascadeGraph += `\t${builder.buildInterfaceDefinition(false, true, true, true)}\n`;
            });
        }
        this.nonIdRelationBuilders.forEach((builder) => {
            if (SSchemaBuilder_1.getManyToOneDecorator(builder.entityProperty)) {
                // Do NOT cascade @ManyToOne's
                return;
            }
            relationsForCascadeGraph += `\t${builder.buildInterfaceDefinition(false, true, true, true)}\n`;
        });
        let transientProperties = ``;
        this.transientPropertyBuilders.forEach((builder) => {
            transientProperties += `\t${builder.buildInterfaceDefinition()}\n`;
        });
        let entityExtendsClause = '';
        let extendedQInterface = `IEntitySelectProperties`;
        let extendedQUpdatePropertiesInterface = `IEntityUpdateProperties`;
        let extendedQCascadeGraphInterface = `IEntityCascadeGraph`;
        let extendedQUpdateColumnsInterface = `IEntityUpdateColumns`;
        let extendedQIdInterface = 'IEntityIdProperties';
        if (this.entity.parentEntity) {
            const parentType = this.entity.parentEntity.type;
            extendedQInterface = `${parentType}ESelect`;
            extendedQUpdatePropertiesInterface = `${parentType}EUpdateProperties`;
            extendedQCascadeGraphInterface = `${parentType}ECascadeGraph`;
            extendedQUpdateColumnsInterface = `${parentType}EUpdateColumns`;
            extendedQIdInterface = `${parentType}EId`;
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
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ${entityName}ESelect
    extends ${extendedQInterface}, ${entityName}EOptionalId {
	// Non-Id Properties
${nonIdEProperties}
	// Id Relations - full property interfaces
${idRelationsForEntityEProperties}
  // Non-Id relations (including OneToMany's)
${nonIdRelationsForEntityEProperties}
}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ${entityName}EId
    extends ${extendedQIdInterface} {
	// Id Properties
${idEProperties}
	// Id Relations - Ids only
${idRelationsEntityIdEProperties}
}

/**
 * Ids fields and relations only (optional).
 */
export interface ${entityName}EOptionalId {
	// Id Properties
${optionalIdEProperties}
	// Id Relations - Ids only
${optionalIdRelationsEntityIdEProperties}
}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ${entityName}EUpdateProperties
	extends ${extendedQUpdatePropertiesInterface} {
	// Non-Id Properties
${nonIdEProperties}
	// Non-Id Relations - ids only & no OneToMany's
${nonIdRelationsForUpdateEProperties}
}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ${entityName}ECascadeGraph
	extends ${extendedQCascadeGraphInterface} {
	// Cascading Relations
${relationsForCascadeGraph}
}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ${entityName}EUpdateColumns
	extends ${extendedQUpdateColumnsInterface} {
	// Non-Id Columns
${nonIdEColumns}
}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ${entityName}ECreateProperties
extends Partial<${entityName}EId>, ${entityName}EUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ${entityName}ECreateColumns
extends ${entityName}EId, ${entityName}EUpdateColumns {
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
exports.IQEntityInterfaceBuilder = IQEntityInterfaceBuilder;
//# sourceMappingURL=IQEntityInterfaceBuilder.js.map