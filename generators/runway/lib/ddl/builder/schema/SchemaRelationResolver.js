import { EntityRelationType, repositoryEntity, SQLDataType } from '@airport/ground-control';
export class SchemaRelationResolver {
    resolveAllRelationLinks(indexedSchema) {
        for (const entityName in indexedSchema.entityMapByName) {
            const indexedEntity = indexedSchema.entityMapByName[entityName];
            if (indexedEntity.entity.isRepositoryEntity) {
                if (indexedEntity.idColumns[0].name !== repositoryEntity.FOREIGN_KEY) {
                    throw new Error(`@Id Column at index 0, must be 'REPOSITORY_ID'`);
                }
            }
            this.resolveEntityRelationLinks(indexedSchema, indexedEntity);
        }
    }
    getEntityRelationsOfType(relationIndexedEntity, entityRelationType, entityName) {
        return relationIndexedEntity.relations.filter((relation) => {
            return relation.relationType === entityRelationType
                && relation.entityName === entityName;
        });
    }
    resolveEntityRelationLinks(indexedSchema, indexedEntity) {
        const anEntity = indexedEntity.entity;
        const relationEntityNameSet = {};
        for (const aProperty of anEntity.properties) {
            const aRelation = aProperty.relation;
            if (!aRelation) {
                continue;
            }
            // TODO: find matching relation
            let relatedOneToManys;
            let relatedManyToOnes;
            let relationEntityIsLocal;
            let relationIndexedEntity;
            let relationEntityName;
            let crossSchema = aRelation.referencedSchemaIndex || aRelation.referencedSchemaIndex === 0;
            if (crossSchema) {
                relationIndexedEntity = indexedSchema.schema
                    .referencedSchemas[aRelation.referencedSchemaIndex].dbSchema.currentVersion[0]
                    .schemaVersion.entityMapByName[aRelation.entityName];
                relationEntityName = relationIndexedEntity.name;
                relationEntityIsLocal = relationIndexedEntity.isLocal;
            }
            else {
                relationIndexedEntity =
                    indexedSchema.entityMapByName[aRelation.entityName];
                if (!relationIndexedEntity) {
                    throw new Error(`Did not find ${aRelation.entityName} entity `
                        + `(via the ${anEntity.name}.${aProperty.name} relation).`);
                }
                relatedOneToManys = this.getEntityRelationsOfType(relationIndexedEntity, EntityRelationType.ONE_TO_MANY, anEntity.name);
                if (relatedOneToManys.length > 1) {
                    for (const relatedOneToMany of relatedOneToManys) {
                        if (relatedOneToMany.oneToMany &&
                            relatedOneToMany.oneToMany.mappedBy) {
                            if (relatedOneToMany.sRelationColumns
                                && relatedOneToMany.sRelationColumns.length) {
                                throw new Error(`@OneToMany with 'mappedBy' cannot define any @JoinColumn(s).`);
                            }
                        }
                        else if (!relatedOneToMany.sRelationColumns
                            || !relatedOneToMany.sRelationColumns.length) {
                            throw new Error(`@OneToMany without 'mappedBy' must define any @JoinColumn(s)`);
                        }
                    }
                }
                relatedManyToOnes = this.getEntityRelationsOfType(relationIndexedEntity, EntityRelationType.MANY_TO_ONE, anEntity.name);
                const relationEntity = relationIndexedEntity.entity;
                relationEntityName = relationEntity.name;
                relationEntityIsLocal = relationEntity.isLocal;
            }
            relationEntityNameSet[aRelation.entityName] = true;
            switch (aRelation.relationType) {
                case EntityRelationType.ONE_TO_MANY:
                    /*					if (aRelation.oneToMany && aRelation.oneToMany.cascade
                                            && anEntity.isLocal && !relationEntityIsLocal) {
                                            throw new Error(
                                                `@OneToMany Relation '${anEntity.name}.${aProperty.name}' is on a Local entity and is cascading
                                            into a repository entity '${aRelation.entityName}'.
                                            Cascading from Local entities to Repository entities is not currently supported.`)
                                        }*/
                    if (crossSchema && !aRelation.sRelationColumns.length) {
                        throw new Error(`@OneToMany Relation '${anEntity.name}.${aProperty.name}' is a cross-schema @OneToMany association.
						@OneToMany associations are not allowed across schemas (without @JoinColumn(s)).`);
                    }
                    break;
                case EntityRelationType.MANY_TO_ONE:
                    // Many-To-One relations are not cascaded, so no cascade check is needed
                    break;
                default:
                    throw new Error(`Unknown EntityRelationType: ${aRelation.relationType}.`);
            }
            let oneSideRelationIndex;
            switch (aRelation.relationType) {
                case EntityRelationType.ONE_TO_MANY:
                    // Don't need to assign oneSideRelationIndex
                    break;
                case EntityRelationType.MANY_TO_ONE:
                    if (!crossSchema) {
                        const matchingRelatedOneToManys = relatedOneToManys.filter(relatedOneToMany => relatedOneToMany.oneToMany && relatedOneToMany.oneToMany.mappedBy === aProperty.name);
                        // FIXME: right now there is no check on the One side of the relationship for
                        // mappedBy pointing to invalid location - add it
                        if (matchingRelatedOneToManys.length > 1) {
                            throw new Error(`Found more ${matchingRelatedOneToManys.length} matching @OneToMany 
							for ${anEntity.name}.${aProperty.name}. Expecting 1 or 0.`);
                        }
                        if (!matchingRelatedOneToManys.length) {
                            break;
                            // throw new Error(`Expecting one matching @OneToMany for
                            // ${anEntity.name}.${aProperty.name} and found
                            // ${matchingRelatedOneToManys.length}`);
                        }
                        oneSideRelationIndex = matchingRelatedOneToManys[0].index;
                    }
                    break;
                default:
                    throw new Error(`Unknown relation type ${aRelation.relationType}.`);
            }
            for (const sRelationColumn of aRelation.sRelationColumns) {
                sRelationColumn.oneSideRelationIndex = oneSideRelationIndex;
                let ownColumn;
                // if (sRelationColumn.ownColumnIdIndex) {
                // 	ownColumn = indexedEntity.idColumns[sRelationColumn.ownColumnIdIndex]
                // 	if (!ownColumn) {
                // 		throw new Error(`Did not find @Id column of ${anEntity.name} at index
                // ${sRelationColumn.ownColumnIdIndex} ` + `(via the
                // ${anEntity.name}.${aProperty.name} relation).`) } } else {
                ownColumn = indexedEntity.columnMap[sRelationColumn.ownColumnReference];
                if (!ownColumn) {
                    throw new Error(`Did not find column ${anEntity.name}.${sRelationColumn.ownColumnReference} `
                        + `(via the ${anEntity.name}.${aProperty.name} relation).`);
                }
                // }
                let relatedColumn;
                // if (sRelationColumn.relationColumnIdIndex
                // 	|| sRelationColumn.relationColumnIdIndex == 0) {
                // 	relatedColumn =
                // relationIndexedEntity.idColumns[sRelationColumn.relationColumnIdIndex] if
                // (!relatedColumn) { throw new Error(
                // `Did not find @Id column of ${relationEntityName} at
                // index ${sRelationColumn.relationColumnIdIndex} ` + `(via the
                // ${anEntity.name}.${aProperty.name} relation).`) } } else
                if (sRelationColumn.relationColumnReference) {
                    relatedColumn = relationIndexedEntity.columnMap[sRelationColumn.relationColumnReference];
                    if (!relatedColumn) {
                        throw new Error(`Did not find column ${relationEntityName}.${sRelationColumn.relationColumnReference} `
                            + `(via the ${anEntity.name}.${aProperty.name} relation).`);
                    }
                }
                else {
                    relatedColumn = relationIndexedEntity.columnMap[ownColumn.name];
                    if (!relatedColumn) {
                        throw new Error(`Did not find column ${relationEntityName}.${ownColumn.name} `
                            + `(via the ${anEntity.name}.${aProperty.name} relation).`);
                    }
                    sRelationColumn.relationColumnReference = ownColumn.name;
                }
                if (crossSchema) {
                    ownColumn.type = this.getTypeFromSQLDataType(relatedColumn.type);
                    this.setTypeForLinkedColumns(ownColumn);
                }
                else {
                    this.linkColumnTypes(ownColumn, relatedColumn);
                    this.setType(ownColumn, relatedColumn);
                }
            }
        }
    }
    linkColumnTypes(ownColumn, relatedColumn) {
        let relatedColumns;
        if (ownColumn.tempColumnTypeLinks) {
            relatedColumns = ownColumn.tempColumnTypeLinks;
            if (relatedColumn.tempColumnTypeLinks) {
                relatedColumns = relatedColumns.concat(relatedColumn.tempColumnTypeLinks);
                ownColumn.tempColumnTypeLinks = relatedColumns;
            }
            else {
                relatedColumns.push(relatedColumn);
            }
            relatedColumn.tempColumnTypeLinks = relatedColumns;
        }
        else if (relatedColumn.tempColumnTypeLinks) {
            relatedColumns = relatedColumn.tempColumnTypeLinks;
            relatedColumns.push(ownColumn);
            ownColumn.tempColumnTypeLinks = relatedColumns;
        }
        else {
            relatedColumns = [ownColumn, relatedColumn];
            ownColumn.tempColumnTypeLinks = relatedColumns;
            relatedColumn.tempColumnTypeLinks = relatedColumns;
        }
    }
    setType(ownColumn, relatedColumn) {
        let type = ownColumn.type;
        if (!type) {
            type = relatedColumn.type;
        }
        if (!type) {
            return;
        }
        for (const column of ownColumn.tempColumnTypeLinks) {
            column.type = type;
        }
    }
    setTypeForLinkedColumns(ownColumn) {
        let type = ownColumn.type;
        if (!type
            || !ownColumn.tempColumnTypeLinks) {
            return;
        }
        for (const column of ownColumn.tempColumnTypeLinks) {
            column.type = type;
        }
    }
    getTypeFromSQLDataType(sqlDataType) {
        switch (sqlDataType) {
            case SQLDataType.ANY:
                return 'any';
            case SQLDataType.BOOLEAN:
                return 'boolean';
            case SQLDataType.DATE:
                return 'Date';
            case SQLDataType.JSON:
                return 'Json';
            case SQLDataType.NUMBER:
                return 'number';
            case SQLDataType.STRING:
                return 'string';
            default:
                throw new Error(`Unexpected SQLDataType: ${sqlDataType}.`);
        }
    }
}
//# sourceMappingURL=SchemaRelationResolver.js.map