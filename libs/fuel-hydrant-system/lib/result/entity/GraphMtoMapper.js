"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
// For MtO mapping in bridged queries
class GraphMtoMapper {
    constructor() {
        // Map of all objects that have a given MtO reference
        // [] MtO reference Schema Entity Index
        // [] MtO reference Entity Index
        this.mtoStubReferenceMap = [];
    }
    addMtoReference(mtoStubReference, mtoEntityIdValue) {
        const mtoDbEntity = mtoStubReference.mtoDbEntity;
        let mtoEntitiesForTypeMap = ground_control_1.ensureChildMap(ground_control_1.ensureChildArray(this.mtoStubReferenceMap, mtoDbEntity.schemaVersion.schema.index), mtoDbEntity.index);
        let mtosForEntity = ground_control_1.ensureChildMap(mtoEntitiesForTypeMap, mtoEntityIdValue);
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