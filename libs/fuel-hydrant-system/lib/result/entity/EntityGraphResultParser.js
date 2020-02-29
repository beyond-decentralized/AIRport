import { newMappedEntityArray, objectExists } from '@airport/air-control';
import { ensureChildArray, ensureChildMap, EntityRelationType } from '@airport/ground-control';
import { GraphMtoMapper } from './GraphMtoMapper';
import { GraphOtmMapper } from './GraphOtmMapper';
import { AbstractObjectResultParser } from './IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * The goal of this parser to to bridge all entity references and arrive at an
 * inter-connected graph (where possible).
 */
export class EntityGraphResultParser extends AbstractObjectResultParser {
    constructor(config, rootDbEntity) {
        super();
        this.config = config;
        this.rootDbEntity = rootDbEntity;
        // Keys can only be strings or numbers | TODO: change to JS Maps, if needed
        this.entityMapBySchemaAndTableIndexes = [];
        // One-To-Many & MtO temp stubs (before entityId is available)
        this.otmStubBuffer = [];
        this.mtoStubBuffer = [];
        // Used in ENTITY_FLATTENED queries
        this.currentResultRow = [];
        this.otmMapper = new GraphOtmMapper();
        this.mtoMapper = new GraphMtoMapper();
    }
    addEntity(entityAlias, dbEntity, airDb, schemaUtils) {
        return schemaUtils.getNewEntity(dbEntity, airDb);
    }
    addProperty(entityAlias, resultObject, dataType, propertyName, propertyValue) {
        resultObject[propertyName] = propertyValue;
        return objectExists(propertyValue);
    }
    bufferManyToOneStub(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, relationInfos, schemaUtils) {
        const oneToManyStubAdded = this.addManyToOneStub(resultObject, propertyName, relationInfos, schemaUtils);
        if (oneToManyStubAdded) {
            const relatedEntityId = schemaUtils.getIdKey(resultObject[propertyName], relationDbEntity);
            this.bufferManyToOne(dbEntity, propertyName, relationDbEntity, relatedEntityId);
        }
    }
    bufferBlankManyToOneStub(entityAlias, resultObject, propertyName) {
        resultObject[propertyName] = null;
        // Nothing to do for bridged parser - bridging will map blanks, where possible
    }
    bufferManyToOneObject(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, childResultObject, schemaUtils) {
        resultObject[propertyName] = childResultObject;
        const relatedEntityId = schemaUtils.getIdKey(resultObject[propertyName], relationDbEntity);
        this.bufferManyToOne(dbEntity, propertyName, relationDbEntity, relatedEntityId);
    }
    bufferManyToOne(dbEntity, propertyName, relationDbEntity, relatedEntityId) {
        let otmEntityField;
        for (const dbRelation of relationDbEntity.relations) {
            switch (dbRelation.relationType) {
                case EntityRelationType.ONE_TO_MANY:
                    break;
                case EntityRelationType.MANY_TO_ONE:
                    continue;
                default:
                    throw new Error(`Unknown EntityRelationType: ${dbRelation.relationType}`);
            }
            if (dbRelation.oneToManyElems && dbRelation.oneToManyElems.mappedBy) {
                otmEntityField = dbRelation.property.name;
            }
        }
        this.mtoStubBuffer.push({
            otmEntityId: relatedEntityId,
            otmDbEntity: relationDbEntity,
            otmEntityField: otmEntityField,
            mtoDbEntity: dbEntity,
            mtoRelationField: propertyName,
            mtoParentObject: null
        });
    }
    bufferBlankManyToOneObject(entityAlias, resultObject, propertyName) {
        resultObject[propertyName] = null;
        // Nothing to do for bridged parser - bridging will map blanks, where possible
    }
    bufferOneToManyStub(otmDbEntity, otmPropertyName) {
        this.bufferOneToMany(otmDbEntity, otmPropertyName);
    }
    bufferOneToManyCollection(entityAlias, resultObject, otmDbEntity, propertyName, relationDbEntity, childResultObject, schemaUtils) {
        this.bufferOneToMany(otmDbEntity, propertyName);
        let childResultsArray = newMappedEntityArray(schemaUtils, relationDbEntity);
        childResultsArray.put(childResultObject);
        resultObject[propertyName] = childResultsArray;
    }
    bufferBlankOneToMany(entityAlias, resultObject, otmEntityName, propertyName, relationDbEntity, schemaUtils) {
        resultObject[propertyName] = newMappedEntityArray(schemaUtils, relationDbEntity);
    }
    bufferOneToMany(otmDbEntity, otmPropertyName) {
        this.otmStubBuffer.push({
            otmDbEntity: otmDbEntity,
            otmPropertyName: otmPropertyName,
            otmObject: null
        });
    }
    flushEntity(entityAlias, dbEntity, selectClauseFragment, entityIdValue, resultObject, schemaUtils) {
        if (!entityIdValue) {
            throw new Error(`No Id provided for entity 
			'${dbEntity.schemaVersion.schema.name}.${dbEntity.name}'`);
        }
        let currentEntity = this.getEntityToFlush(dbEntity, selectClauseFragment, entityIdValue, resultObject, schemaUtils);
        this.flushRelationStubBuffers(entityIdValue, currentEntity, dbEntity, schemaUtils);
        return currentEntity;
    }
    getEntityToFlush(dbEntity, selectClauseFragment, idValue, resultObject, schemaUtils) {
        if (!idValue) {
            throw new Error(`Entity ID not specified for entity 
			'${dbEntity.schemaVersion.schema.name}.${dbEntity.name}'.`);
        }
        let entityMapForName = ensureChildMap(ensureChildArray(this.entityMapBySchemaAndTableIndexes, dbEntity.schemaVersion.schema.index), dbEntity.index);
        let existingEntity = entityMapForName[idValue];
        let currentEntity = this.mergeEntities(existingEntity, resultObject, dbEntity, selectClauseFragment, schemaUtils);
        entityMapForName[idValue] = currentEntity;
        return currentEntity;
    }
    // Must merge the one-to-many relationships returned as part of the result tree
    /**
     * Merge entities with of the same class and with the same Id
     *
     * @param source
     * @param target
     * @param qEntity
     * @param selectClauseFragment
     * @param entityPropertyTypeMap
     * @param entityRelationMap
     * @returns {any}
     */
    mergeEntities(source, target, dbEntity, selectClauseFragment, schemaUtils) {
        if (!source || target === source) {
            return target;
        }
        const id = schemaUtils.getIdKey(target, dbEntity);
        for (let propertyName in selectClauseFragment) {
            if (selectClauseFragment[propertyName] === undefined) {
                continue;
            }
            const dbProperty = dbEntity.propertyMap[propertyName];
            // Merge properties (conflicts detected at query parsing time):
            if (!dbProperty.relation || !dbProperty.relation.length) {
                // If source property doesn't exist
                if (schemaUtils.isEmpty(source[propertyName])) {
                    // set the source property to value of target
                    source[propertyName] = target[propertyName];
                }
                // Else if target property doesn't exist, keep the source value
                // Else, assume that properties must be the same
            }
            // Merge relations
            else {
                const childSelectClauseFragment = selectClauseFragment[propertyName];
                // For stubs (conflicts detected at query parsing time)
                if (childSelectClauseFragment == null) {
                    // For Many-to-One stubs, assume they are are the same and don't detect
                    // conflicts, just merge
                    source[propertyName] = target[propertyName];
                    // Don't process One-to-Many stubs yet (not all related MTOs may have been
                    // collected).
                }
                // For actual objects
                else {
                    const dbRelation = dbProperty.relation[0];
                    const childDbEntity = dbRelation.relationEntity;
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            // Many-to-One (conflicts detected at query parsing time)
                            // If source is missing this mapping and target has it
                            if (source[propertyName] === undefined && target[propertyName] !== undefined) {
                                // set the source property to value of target
                                source[propertyName] = target[propertyName];
                            }
                            // Else if target property doesn't exist, keep the source value
                            // Assume that the child objects have already been merged themselves and
                            // don't process
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            let sourceArray = source[propertyName];
                            const targetArray = target[propertyName];
                            // Because parseQueryResult is depth-first, all child objects have already
                            // been processed
                            // TODO: this will probably fail, since the merged in array should always
                            // have only one entity in it because it is created for a single result set
                            // row.
                            if (this.config && this.config.strict) {
                                if ((!sourceArray && targetArray)
                                    || (!targetArray && sourceArray)
                                    || sourceArray.length != targetArray.length) {
                                    throw new Error(`One-to-Many child arrays don't match for 
									'${dbEntity.name}.${dbProperty.name}', Id: ${id}`);
                                }
                            }
                            const sourceSet = {};
                            if (sourceArray) {
                                sourceArray.forEach((sourceChild) => {
                                    const sourceChildIdValue = schemaUtils.getIdKey(sourceChild, childDbEntity);
                                    sourceSet[sourceChildIdValue] = sourceChild;
                                });
                            }
                            else {
                                sourceArray = [];
                                source[propertyName] = sourceArray;
                            }
                            if (targetArray) {
                                targetArray.forEach((targetChild) => {
                                    const targetChildIdValue = schemaUtils.getIdKey(targetChild, childDbEntity);
                                    if (this.config && this.config.strict && !sourceSet[targetChildIdValue]) {
                                        throw new Error(`One-to-Many child arrays don't match for 
										'${dbEntity.name}.${dbProperty.name}', Id: ${id}`);
                                    }
                                    // If target child array has a value that source doesn't
                                    if (!sourceSet[targetChildIdValue]) {
                                        // add it to source (preserve order)
                                        sourceArray.put(targetChild);
                                    }
                                });
                            }
                            // So instead just do
                            // sourceArray.putAll(targetArray);
                            break;
                        default:
                            throw new Error(`Unknown relation type '${dbRelation.relationType}' for 
							'${dbEntity.name}.${dbProperty.name}'`);
                    }
                }
            }
        }
        return source;
    }
    flushRelationStubBuffers(entityIdValue, currentEntity, dbEntity, schemaUtils) {
        let otmStubBuffer = this.otmStubBuffer;
        this.otmStubBuffer = [];
        otmStubBuffer.forEach((otmStub) => {
            otmStub.otmObject = currentEntity;
            this.otmMapper.addOtmReference(otmStub, entityIdValue);
        });
        let mtoStubBuffer = this.mtoStubBuffer;
        this.mtoStubBuffer = [];
        mtoStubBuffer.forEach((mtoStub) => {
            mtoStub.mtoParentObject = currentEntity;
            this.otmMapper.addMtoReference(mtoStub, entityIdValue, dbEntity, schemaUtils);
            this.mtoMapper.addMtoReference(mtoStub, entityIdValue);
        });
    }
    flushRow() {
        // Nothing to do, bridged queries don't rely on rows changing
    }
    bridge(parsedResults, selectClauseFragment, schemaUtils) {
        this.mtoMapper.populateMtos(this.entityMapBySchemaAndTableIndexes);
        this.otmMapper.populateOtms(this.entityMapBySchemaAndTableIndexes, !this.config || this.config.mapped);
        // merge any out of order entity references (there shouldn't be any)
        let resultMEA = newMappedEntityArray(schemaUtils, this.rootDbEntity);
        resultMEA.putAll(parsedResults);
        if (!this.config || this.config.mapped) {
            return resultMEA;
        }
        return resultMEA.toArray();
    }
}
//# sourceMappingURL=EntityGraphResultParser.js.map