"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const fs = require("fs");
const pathResolver_1 = require("../resolve/pathResolver");
const EntityCandidate_1 = require("./EntityCandidate");
const EntityDefinitionGenerator_1 = require("./EntityDefinitionGenerator");
const utils_1 = require("./utils");
/**
 * Created by Papa on 3/27/2016.
 */
class EntityCandidateRegistry {
    constructor(enumMap) {
        this.enumMap = enumMap;
        this.entityCandidateMap = new Map();
        this.allInterfacesMap = new Map();
        this.dbSchemaBuilder = new ground_control_1.DbSchemaBuilder(new ground_control_1.DatastructureUtils());
        this.allSchemas = [];
        this.schemaMap = {};
    }
    addCandidate(candidate) {
        let matchesExisting = this.matchToExistingEntity(candidate);
        if (!matchesExisting) {
            this.entityCandidateMap.set(candidate.type, candidate);
        }
        else {
            candidate = this.entityCandidateMap.get(candidate.type);
        }
    }
    matchVerifiedEntities(//
    targetCandidateRegistry //
    ) {
        let entityMapByName = {};
        for (let targetCandidate of targetCandidateRegistry.entityCandidateMap.values()) {
            entityMapByName[targetCandidate.type] = targetCandidate;
            if (!targetCandidate.parentClassName || targetCandidate.parentEntity) {
                continue;
            }
            targetCandidate.parentEntity = targetCandidateRegistry.entityCandidateMap.get(targetCandidate.parentClassName);
            if (targetCandidate.parentEntity) {
                continue;
            }
            let parentType = EntityDefinitionGenerator_1.globalCandidateInheritanceMap[targetCandidate.type];
            while (parentType) {
                targetCandidate.parentEntity = targetCandidateRegistry.entityCandidateMap.get(parentType);
                if (targetCandidate.parentEntity) {
                    break;
                }
                parentType = EntityDefinitionGenerator_1.globalCandidateInheritanceMap[parentType];
            }
        }
        let entityInterfaceMap = {};
        for (let className in entityMapByName) {
            let entityCandidate = entityMapByName[className];
            entityCandidate.implementedInterfaceNames.forEach((interfaceName) => {
                let matchingInterfaces = this.allInterfacesMap.get(interfaceName);
                if (!matchingInterfaces || !matchingInterfaces.length) {
                    return;
                }
                if (matchingInterfaces.length > 1) {
                    throw `Found multiple definitions of interface '${interfaceName}' implemented by entity '${className}'.  Interfaces implemented by entity classes must have globally unique names.`;
                }
                let anInterface = matchingInterfaces[0];
                anInterface.implementedBySet.add(entityCandidate);
                entityInterfaceMap[interfaceName] = anInterface;
            });
        }
        let classifiedEntitySet = this.classifyEntityProperties(entityInterfaceMap);
        return entityMapByName;
    }
    classifyEntityProperties(entityInterfaceMap) {
        let classifiedEntitySet = new Set();
        let dictionary = {
            dbColumnRelationMapByManySide: {},
            dbColumnRelationMapByOneSide: {}
        };
        for (let [type, candidate] of this.entityCandidateMap) {
            classifiedEntitySet.add(candidate);
            let properties = candidate.docEntry.properties;
            if (!properties) {
                return;
            }
            const fileImports = candidate.docEntry.fileImports;
            properties.forEach((//
            property //
            ) => {
                let type = property.type;
                if (utils_1.endsWith(type, '[]')) {
                    property.isArray = true;
                    type = type.substr(0, type.length - 2);
                }
                else if (utils_1.startsWith(type, 'Array<')) {
                    type = type.substr(6, type.length - 1);
                }
                property.nonArrayType = type;
                property.decorators.filter(decorator => decorator.name === 'Column').forEach(decorator => {
                    decorator.values.filter(value => value.columnDefinition).forEach(value => {
                        property.columnDefinition = value.columnDefinition;
                    });
                });
                switch (type) {
                    case 'boolean':
                        property.primitive = 'boolean';
                        break;
                    case 'number':
                        property.primitive = 'number';
                        break;
                    case 'string':
                        property.primitive = 'string';
                        break;
                    case 'Date':
                        property.primitive = 'Date';
                        break;
                    case 'any':
                        property.primitive = 'any';
                        break;
                }
                if (property.decorators.some(decorator => decorator.name === 'Json')) {
                    property.primitive = 'Json';
                }
                if (property.decorators.some(decorator => decorator.name === 'DbAny')) {
                    property.primitive = 'any';
                }
                if (property.decorators.some(decorator => decorator.name === 'DbBoolean')) {
                    property.primitive = 'boolean';
                }
                if (property.decorators.some(decorator => decorator.name === 'DbDate')) {
                    property.primitive = 'Date';
                }
                if (property.decorators.some(decorator => decorator.name === 'DbNumber')) {
                    property.primitive = 'number';
                }
                if (property.decorators.some(decorator => decorator.name === 'DbString')) {
                    property.primitive = 'string';
                }
                if (property.primitive) {
                    if (property.isArray) {
                        throw `Arrays are currently not supported outside of @OneToMany.
						Please use any.
						
						File:     ${property.ownerEntity.path}
						Property: ${property.name}
						`;
                    }
                    return;
                }
                const objectMapFragments = type.split(':');
                if (objectMapFragments.length > 1) {
                    if (!property.isTransient) {
                        throw `Non @Transient properties cannot be object maps.`;
                    }
                    property.isMap = true;
                    const objectMapValueFragment = objectMapFragments[objectMapFragments.length - 1];
                    property.mapValueType = objectMapValueFragment
                        .replace('}', '')
                        .replace(';', '')
                        .trim();
                    type = property.mapValueType;
                    property.mapValueIsPrimitive = utils_1.isPrimitive(type);
                    const objectMapKeyNameFragment = objectMapFragments[0];
                    property.mapKeyName = objectMapKeyNameFragment
                        .replace('{', '')
                        .replace('[', '')
                        .trim();
                    const objectMapKeyTypeFragment = objectMapFragments[1];
                    property.mapKeyType = objectMapKeyTypeFragment
                        .replace(']', '')
                        .trim();
                }
                if (!property.mapValueIsPrimitive && !fileImports.importMapByObjectAsName[type]) {
                    throw `Type '${type}' is not an import in ${candidate.path}.` +
                        `  All type references in entities must must be imported (needed for DDL hiding).`;
                }
                // Do not check transient properties
                if (property.isTransient) {
                    return;
                }
                const moduleImport = fileImports.importMapByObjectAsName[type];
                if (!moduleImport.isLocal) {
                    const projectName = this.getProjectReferenceFromPath(moduleImport.path);
                    property.fromProject = projectName;
                    const projectSchema = this.schemaMap[projectName];
                    if (projectSchema) {
                        property.otherSchemaDbEntity = this.getOtherSchemaEntity(projectName, projectSchema, property);
                        return;
                    }
                    const pathsToReferencedSchemas = this.configuration.airport.node_modulesLinks.pathsToReferencedSchemas;
                    let relatedSchemaProject;
                    if (pathsToReferencedSchemas && pathsToReferencedSchemas[projectName]) {
                        let referencedSchemaRelativePath = '../../' + pathsToReferencedSchemas[projectName];
                        for (let i = 0; i < 10; i++) {
                            referencedSchemaRelativePath = '../' + referencedSchemaRelativePath;
                            let pathToSchema = pathResolver_1.getFullPathFromRelativePath(referencedSchemaRelativePath, __filename);
                            if (fs.existsSync(pathToSchema)
                                && fs.lstatSync(pathToSchema).isDirectory()) {
                                relatedSchemaProject = require(pathToSchema);
                                break;
                            }
                        }
                    }
                    else {
                        relatedSchemaProject = require(projectName);
                    }
                    if (!relatedSchemaProject) {
                        throw `Could not find related schema project '${projectName}'`;
                    }
                    if (!relatedSchemaProject.SCHEMA) {
                        throw `Could not find related schema in project '${projectName}'`;
                    }
                    const dbSchema = this.dbSchemaBuilder.buildDbSchemaWithoutReferences(relatedSchemaProject.SCHEMA, this.allSchemas, dictionary);
                    this.schemaMap[projectName] = dbSchema;
                    property.otherSchemaDbEntity = this.getOtherSchemaEntity(projectName, dbSchema, property);
                }
                else {
                    let verifiedEntity = this.entityCandidateMap.get(type);
                    if (verifiedEntity) {
                        property.entity = verifiedEntity;
                        return;
                    }
                    let anInterface = entityInterfaceMap[type];
                    if (anInterface) {
                        this.registerInterface(anInterface, property);
                        property.entity = anInterface.implementation;
                    }
                    else {
                        if (pathResolver_1.canBeInterface(type)) {
                            const entityType = pathResolver_1.getImplNameFromInterfaceName(type);
                            verifiedEntity = this.entityCandidateMap.get(entityType);
                            if (verifiedEntity) {
                                const externalInterface = new EntityCandidate_1.Interface(null, type);
                                externalInterface.implementation = verifiedEntity;
                                entityInterfaceMap[type] = externalInterface;
                                this.registerInterface(externalInterface, property);
                                property.entity = verifiedEntity;
                            }
                            else {
                                throw `Did not find project-local Entity type: '${entityType}' (from interface ${type}).
								Did you forget to decorate it with @Entity()?`;
                            }
                        }
                        else {
                            throw `Did not find project-local Entity type: '${type}'.
							Did you forget to decorate it with @Entity()?`;
                        }
                    }
                }
            });
        }
        return classifiedEntitySet;
    }
    getOtherSchemaEntity(projectName, dbSchema, property) {
        const type = property.nonArrayType;
        let otherSchemaDbEntity = dbSchema.currentVersion.entityMapByName[type];
        if (!otherSchemaDbEntity) {
            if (pathResolver_1.canBeInterface(type)) {
                const relatedImplementationName = pathResolver_1.getImplNameFromInterfaceName(type);
                otherSchemaDbEntity = dbSchema.currentVersion.entityMapByName[relatedImplementationName];
                if (!otherSchemaDbEntity) {
                    throw `Could not find entity '${relatedImplementationName}' 
					(from interface ${type}) in project '${projectName}'`;
                }
            }
            else {
                throw `Could not find entity '${type}' in project '${projectName}'`;
            }
        }
        return otherSchemaDbEntity;
    }
    registerInterface(anInterface, property) {
        if (anInterface.implementedBySet.size > 1) {
            let implementations = [];
            for (let entity of anInterface.implementedBySet) {
                implementations.push(entity.type);
            }
            throw `Interface ${anInterface.name}, is implemented by more than one entity (${implementations.join(', ')}).  Interfaces used in relations can only be implemented by one entity.`;
        }
        let implementedEntity = anInterface.implementedBySet.values().next().value;
        property.entity = implementedEntity;
    }
    getProjectReferenceFromPath(path) {
        const pathFragments = path.split('/');
        if (path.indexOf('@') === 0) {
            return pathFragments[0] + '/' + pathFragments[1];
        }
        return pathFragments[0];
    }
    matchToExistingEntity(entityCandidate) {
        let existingCandidate = this.entityCandidateMap.get(entityCandidate.type);
        if (!existingCandidate) {
            return false;
        }
        return true;
    }
}
exports.EntityCandidateRegistry = EntityCandidateRegistry;
//# sourceMappingURL=EntityCandidateRegistry.js.map