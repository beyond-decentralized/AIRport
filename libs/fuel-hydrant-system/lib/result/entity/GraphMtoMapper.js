import { ensureChildArray, ensureChildMap } from '@airport/ground-control';
// For MtO mapping in bridged queries
export class GraphMtoMapper {
    constructor() {
        // Map of all objects that have a given MtO reference
        // [] MtO reference Schema Entity Index
        // [] MtO reference Entity Index
        this.mtoStubReferenceMap = [];
    }
    addMtoReference(mtoStubReference, mtoEntityIdValue) {
        const mtoDbEntity = mtoStubReference.mtoDbEntity;
        let mtoEntitiesForTypeMap = ensureChildMap(ensureChildArray(this.mtoStubReferenceMap, mtoDbEntity.schemaVersion.schema.index), mtoDbEntity.index);
        let mtosForEntity = ensureChildMap(mtoEntitiesForTypeMap, mtoEntityIdValue);
        mtosForEntity[mtoStubReference.mtoRelationField] = mtoStubReference;
    }
    populateMtos(entityMap) {
        for (const schemaIndex in this.mtoStubReferenceMap) {
            const mtoEntitiesForSchemaMap = this.mtoStubReferenceMap[schemaIndex];
            for (const entityIndex in mtoEntitiesForSchemaMap) {
                const mtoEntitiesForTypeMap = mtoEntitiesForSchemaMap[entityIndex];
                for (let mtoEntityId in mtoEntitiesForTypeMap) {
                    let mtosForEntity = mtoEntitiesForTypeMap[mtoEntityId];
                    for (let mtoPropertyName in mtosForEntity) {
                        let mtoStubReference = mtosForEntity[mtoPropertyName];
                        let otmDbEntity = mtoStubReference.otmDbEntity;
                        if (!entityMap[otmDbEntity.schemaVersion.schema.index]) {
                            continue;
                        }
                        let otmEntitiesForTypeMap = entityMap[otmDbEntity.schemaVersion.schema.index][otmDbEntity.index];
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