import { ensureChildArray, ensureChildMap } from '@airport/ground-control';
// For OtM mapping in bridged queries
export class GraphOtmMapper {
    constructor() {
        // Map of MtO referred objects by OtM references
        // [] OTM Reference Entity Application Index
        // [] OTM Reference Entity Index
        this.mtoEntityReferenceMap = [];
        // Map of objects with OtM references by
        // [] OtM reference Application Entity Index
        // [] OtM reference Entity Index
        this.otmEntityReferenceMap = [];
    }
    addMtoReference(mtoStubReference, mtoEntityId, dbEntity, context) {
        // If the @OneToMany({ mappedBy: ... }) is missing, there is nothing to map to
        if (!mtoStubReference.otmEntityField) {
            return;
        }
        // Add into mtoEntityReferenceMap
        const otmDbEntity = mtoStubReference.otmDbEntity;
        let mtoEntityReferenceMapForEntity = ensureChildMap(ensureChildArray(this.mtoEntityReferenceMap, otmDbEntity.applicationVersion.application.index), otmDbEntity.index);
        let mapForOtmEntity = mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId];
        if (!mapForOtmEntity) {
            mapForOtmEntity = {};
            mtoEntityReferenceMapForEntity[mtoStubReference.otmEntityId] = mapForOtmEntity;
        }
        let mtoCollection = mapForOtmEntity[mtoStubReference.otmEntityField];
        if (!mtoCollection) {
            mtoCollection = [];
            mapForOtmEntity[mtoStubReference.otmEntityField]
                = mtoCollection;
        }
        mtoCollection.push(mtoStubReference.mtoParentObject);
    }
    addOtmReference(otmStubReference, otmEntityIdValue) {
        // Add into otoEntityReferenceMap
        const otmDbEntity = otmStubReference.otmDbEntity;
        let mtoEntityReferenceMapForEntity = ensureChildMap(ensureChildArray(this.otmEntityReferenceMap, otmDbEntity.applicationVersion.application.index), otmDbEntity.index);
        let otmRecordByPropertyName = mtoEntityReferenceMapForEntity[otmEntityIdValue];
        if (!otmRecordByPropertyName) {
            otmRecordByPropertyName = {};
            mtoEntityReferenceMapForEntity[otmEntityIdValue] = otmRecordByPropertyName;
        }
        otmRecordByPropertyName[otmStubReference.otmPropertyName] = otmStubReference.otmObject;
    }
    populateOtms(entityMap) {
        for (const applicationIndex in this.mtoEntityReferenceMap) {
            const mtoEntityReferenceMapForApplication = this.mtoEntityReferenceMap[applicationIndex];
            for (const entityIndex in mtoEntityReferenceMapForApplication) {
                const mtoEntityReferenceMapForEntity = mtoEntityReferenceMapForApplication[entityIndex];
                // If there are no entities of this type in query results, just keep the stubs
                if (!entityMap[applicationIndex]) {
                    continue;
                }
                let entityOfTypeMap = entityMap[applicationIndex][entityIndex];
                // If there are no entities of this type in query results, just keep the stubs
                if (!entityOfTypeMap) {
                    continue;
                }
                // If there are no OTM for this type in query results, no mapping needs to happen
                if (!this.otmEntityReferenceMap[applicationIndex]) {
                    continue;
                }
                let entityWithOtmMap = this.otmEntityReferenceMap[applicationIndex][entityIndex];
                // If there are no OTM for this type in query results, no mapping needs to happen
                if (!entityWithOtmMap) {
                    continue;
                }
                for (let otmEntityId in mtoEntityReferenceMapForEntity) {
                    let referencedEntitiesByPropertyMap = mtoEntityReferenceMapForEntity[otmEntityId];
                    let otmRecordByPropertyName = entityWithOtmMap[otmEntityId];
                    // If there are no OtMs for this entity, no mapping needs to happen
                    if (!otmRecordByPropertyName) {
                        continue;
                    }
                    for (let otmProperty in referencedEntitiesByPropertyMap) {
                        let otmEntity = otmRecordByPropertyName[otmProperty];
                        // If OtM entity doesn't have this collection, no mapping needs to happen
                        if (!otmEntity) {
                            continue;
                        }
                        let referencedEntityArray = referencedEntitiesByPropertyMap[otmProperty];
                        let otmCollection = otmEntity[otmProperty];
                        // If @OneToMany isn't set yet
                        if (!otmCollection) {
                            otmEntity[otmProperty] = referencedEntityArray;
                        }
                        else {
                            for (let referencedEntity of referencedEntityArray) {
                                otmCollection.push(referencedEntity);
                            }
                        }
                        otmRecordByPropertyName[otmProperty] = otmEntity[otmProperty].slice();
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=GraphOtmMapper.js.map