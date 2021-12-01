import { ensureChildArray, ensureChildMap } from '@airport/ground-control';
// For MtO mapping in bridged queries
export class GraphMtoMapper {
    constructor() {
        // Map of all objects that have a given MtO reference
        // [] MtO reference Application Entity Index
        // [] MtO reference Entity Index
        this.mtoStubReferenceMap = [];
    }
    addMtoReference(mtoStubReference, mtoEntityIdValue) {
        const mtoDbEntity = mtoStubReference.mtoDbEntity;
        let mtoEntitiesForTypeMap = ensureChildMap(ensureChildArray(this.mtoStubReferenceMap, mtoDbEntity.applicationVersion.application.index), mtoDbEntity.index);
        let mtosForEntity = ensureChildMap(mtoEntitiesForTypeMap, mtoEntityIdValue);
        mtosForEntity[mtoStubReference.mtoRelationField] = mtoStubReference;
    }
    populateMtos(entityMap) {
        for (const applicationIndex in this.mtoStubReferenceMap) {
            const mtoEntitiesForApplicationMap = this.mtoStubReferenceMap[applicationIndex];
            for (const entityIndex in mtoEntitiesForApplicationMap) {
                const mtoEntitiesForTypeMap = mtoEntitiesForApplicationMap[entityIndex];
                for (let mtoEntityId in mtoEntitiesForTypeMap) {
                    let mtosForEntity = mtoEntitiesForTypeMap[mtoEntityId];
                    for (let mtoPropertyName in mtosForEntity) {
                        let mtoStubReference = mtosForEntity[mtoPropertyName];
                        let otmDbEntity = mtoStubReference.otmDbEntity;
                        if (!entityMap[otmDbEntity.applicationVersion.application.index]) {
                            continue;
                        }
                        let otmEntitiesForTypeMap = entityMap[otmDbEntity.applicationVersion.application.index][otmDbEntity.index];
                        if (!otmEntitiesForTypeMap) {
                            continue;
                        }
                        let otmEntity = otmEntitiesForTypeMap[mtoStubReference.otmEntityId];
                        if (!otmEntity) {
                            continue;
                        }
                        mtoStubReference.mtoParentObject[mtoStubReference.mtoRelationField] = otmEntity;
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=GraphMtoMapper.js.map