import { entityExtendsOrIsAirEntity } from '../../application/SApplicationBuilder';
import { VCoreEntityBuilder } from './VCoreEntityBuilder';
export class VEntityRelationBuilder extends VCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName) {
        super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
    }
    build() {
        let vName = `V${this.entity.docEntry.name}`;
        const isMappedSuperclass = this.entity.docEntry.decorators.some(decorator => {
            return decorator.name === 'MappedSuperclass';
        });
        let genericType = '';
        let entity = this.entity.docEntry.name;
        const [isAirEntity, _] = entityExtendsOrIsAirEntity(this.entity);
        let parentInterfaceType = 'IVRelation';
        if (isAirEntity) {
            parentInterfaceType = 'IVAirEntityRelation';
        }
        let parentEntityVType = `${parentInterfaceType}<${vName}>`;
        if (isMappedSuperclass) {
            if (isAirEntity) {
                genericType = '<SubType, SubQType extends IQEntity>';
                parentEntityVType = `${parentInterfaceType}<SubType, SubQType>`;
            }
            else {
                genericType = '<SubQType extends IQEntity>';
                parentEntityVType = `${parentInterfaceType}<SubQType>`;
            }
        }
        if (this.entity.parentEntity) {
            let ivEntity = vName;
            if (isMappedSuperclass) {
                ivEntity = 'SubVType';
                entity = 'SubType';
            }
            if (isAirEntity) {
                let entityType = entity;
                if (!isMappedSuperclass) {
                    entityType = 'I' + entityType;
                }
                parentEntityVType = `V${this.entity.parentEntity.type}VRelation<${entityType}, ${ivEntity}>`;
            }
            else {
                parentEntityVType = `V${this.entity.parentEntity.type}VRelation<${ivEntity}>`;
            }
        }
        const classSource = `// Entity Relation Interface
export interface ${vName}VRelation${genericType}
	extends ${parentEntityVType}, ${vName}VId {
}`;
        return classSource;
    }
}
//# sourceMappingURL=VEntityRelationBuilder.js.map