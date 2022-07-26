/**
 * Created by Papa on 5/20/2016.
 */
export class IVEntityInterfaceBuilder {
    constructor(entity, vEntityBuilder) {
        this.entity = entity;
        this.idPropertyBuilders = vEntityBuilder.idPropertyBuilders;
        this.idRelationBuilders = vEntityBuilder.idRelationBuilders;
        this.nonIdPropertyBuilders = vEntityBuilder.nonIdPropertyBuilders;
        this.nonIdRelationBuilders = vEntityBuilder.nonIdRelationBuilders;
    }
    build() {
        let entityName = `${this.entity.docEntry.name}`;
        let idEProperties = ``;
        this.idPropertyBuilders.forEach((builder) => {
            idEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`;
        });
        let idRelationsForEntityEProperties = ``;
        this.idRelationBuilders.forEach((builder) => {
            idRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`;
        });
        let nonIdEProperties = ``;
        this.nonIdPropertyBuilders.forEach((builder) => {
            nonIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`;
        });
        let nonIdRelationsForEntityEProperties = ``;
        this.nonIdRelationBuilders.forEach((builder) => {
            nonIdRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`;
        });
        let extendedVInterface = `IEntityVDescriptor`;
        if (this.entity.parentEntity) {
            const parentType = this.entity.parentEntity.type;
            extendedVInterface = `${parentType}VDescriptor`;
        }
        let interfaceSource = `
////////////////////
//  API INTERFACE //
////////////////////

export interface ${entityName}VDescriptor
    extends ${extendedVInterface} {
	// Id Properties
${idEProperties}	
	// Non-Id Properties
${nonIdEProperties}
	// Id Relations - full property interfaces
${idRelationsForEntityEProperties}
  // Non-Id relations (including OneToMany's)
${nonIdRelationsForEntityEProperties}
}

`;
        return interfaceSource;
    }
}
//# sourceMappingURL=IVEntityInterfaceBuilder.js.map