"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// For MtO mapping in bridged queries
class GraphMtoMapper {
    constructor(utils) {
        this.utils = utils;
        // Map of all objects that have a given MtO reference
        // [] MtO reference Schema Entity Index
        // [] MtO reference Entity Index
        this.mtoStubReferenceMap = [];
    }
    addMtoReference(mtoStubReference, mtoEntityIdValue) {
        const mtoDbEntity = mtoStubReference.mtoDbEntity;
        let mtoEntitiesForTypeMap = this.utils.ensureChildMap(this.utils.ensureChildArray(this.mtoStubReferenceMap, mtoDbEntity.schema.index), mtoDbEntity.index);
        let mtosForEntity = this.utils.ensureChildMap(mtoEntitiesForTypeMap, mtoEntityIdValue);
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
                        let otmEntitiesForTypeMap = entityMap[schemaIndex][entityIndex];
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
exports.GraphMtoMapper = GraphMtoMapper;
//# sourceMappingURL=GraphMtoMapper.js.map