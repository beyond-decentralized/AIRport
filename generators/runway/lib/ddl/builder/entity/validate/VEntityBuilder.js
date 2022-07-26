import { VCoreEntityBuilder } from "./VCoreEntityBuilder";
/**
 * Created by Papa on 4/25/2016.
 */
export class VEntityBuilder extends VCoreEntityBuilder {
    constructor(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName, sIndexedEntity) {
        super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
        this.sIndexedEntity = sIndexedEntity;
        const idProperties = entity.getIdProperties();
        this.idPropertyBuilders = this.getVPropertyBuilders(idProperties);
        this.idRelationBuilders = this.getVRelationBuilders(idProperties);
        const nonIdProperties = entity.getNonIdProperties();
        this.nonIdPropertyBuilders = this.getVPropertyBuilders(nonIdProperties);
        this.nonIdRelationBuilders = this.getVRelationBuilders(nonIdProperties);
        this.transientPropertyBuilders = this.getVTransientPropertyBuilders(entity.getTransientProperties());
    }
    build() {
        throw new Error(`Not Used`);
    }
}
//# sourceMappingURL=VEntityBuilder.js.map