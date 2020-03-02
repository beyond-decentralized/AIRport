"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    build() {
        let entityName = `${this.entity.docEntry.name}`;
        let idEProperties = ``;
        this.idPropertyBuilders.forEach((builder) => {
            idEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`;
        });
        let optionalIdEProperties = ``;
        this.idPropertyBuilders.forEach((builder) => {
            optionalIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`;
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
        let nonIdEProperties = ``;
        this.nonIdPropertyBuilders.forEach((builder) => {
            nonIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`;
        });
        let nonIdEColumns = ``;
        this.nonIdColumnBuilders.forEach((builder) => {
            nonIdEColumns += `\t${builder.buildInterfaceDefinition()}\n`;
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
        }
        let interfaceSource = `
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
}
exports.IQEntityInterfaceBuilder = IQEntityInterfaceBuilder;
//# sourceMappingURL=IQEntityInterfaceBuilder.js.map