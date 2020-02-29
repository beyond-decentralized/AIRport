export function buildIndexedSSchema(schema, referencedSchemasByName) {
    const idx = {
        entities: [],
        entityMapByName: {},
        referencedSchemasByName,
        schema
    };
    for (const entity of schema.entities) {
        const columnMap = {};
        const propertyMap = {};
        const relationMap = {};
        const columns = [];
        const idColumns = [];
        const relations = [];
        for (const property of entity.properties) {
            propertyMap[property.name] = property;
            if (property.columns) {
                for (const column of property.columns) {
                    columnMap[column.name] = column;
                    columns[column.index] = column;
                    if (column.idIndex || column.idIndex === 0) {
                        idColumns[column.idIndex] = column;
                    }
                }
            }
            if (property.relation) {
                relationMap[property.name] = property.relation;
                relations[property.relation.index] = property.relation;
            }
        }
        const indexedEntity = {
            columnMap,
            columns,
            entity,
            idColumns,
            propertyMap,
            relationMap,
            relations,
        };
        idx.entities[entity.tableIndex] = indexedEntity;
        idx.entityMapByName[entity.name] = indexedEntity;
    }
    return idx;
}
//# sourceMappingURL=SSchema.js.map