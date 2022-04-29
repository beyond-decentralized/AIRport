import { EntityRelationType } from '@airport/ground-control';
import { wrapPrimitive } from '../../core/field/WrapperFunctions';
import { AbstractUpdate } from './AbstractUpdate';
/**
 * Created by Papa on 10/2/2016.
 */
// FIXME: add support for a full blown UPDATE, with expression support for SET
export class UpdateProperties extends AbstractUpdate {
    constructor(rawUpdate) {
        super(rawUpdate);
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            U: this.rawUpdate.update
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager),
            S: this.setToJSON(this.rawUpdate.set, queryUtils, fieldUtils),
            W: queryUtils.whereClauseToJSON(this.rawUpdate.where, this.columnAliases)
        };
    }
    setToJSON(rawSet, queryUtils, fieldUtils) {
        const jsonSetClause = {};
        const dbEntity = this.rawUpdate.update.__driver__.dbEntity;
        const dbPropertyMap = dbEntity.propertyMap;
        this.setEntityFragmentsToJSON(rawSet, jsonSetClause, [], dbPropertyMap, [], queryUtils, fieldUtils);
        return jsonSetClause;
    }
    setEntityFragmentsToJSON(rawSetFragment, jsonSetClause, dbPropertyChain, dbPropertyMap, childDbRelationChain, queryUtils, fieldUtils) {
        const isTopLevelFragment = !dbPropertyMap.length;
        for (const propertyName in rawSetFragment) {
            const dbProperty = dbPropertyMap[propertyName];
            const dbEntity = dbProperty.entity;
            if (!dbProperty) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Unknown property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            if (isTopLevelFragment && dbProperty.isId) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update @Id properties:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            else if (!isTopLevelFragment && !dbProperty.isId) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Updated properties of nested entities must be @Id properties:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            const childDbPropertyChain = [...dbPropertyChain];
            childDbPropertyChain.push(dbProperty);
            this.setFragmentToJSON(rawSetFragment, jsonSetClause, childDbPropertyChain, propertyName, childDbRelationChain, queryUtils, fieldUtils);
        }
    }
    setFragmentToJSON(rawSetFragment, jsonSetClause, dbPropertyChain, propertyName, dbRelationChain, queryUtils, fieldUtils) {
        const dbProperty = dbPropertyChain[dbPropertyChain.length - 1];
        const dbEntity = dbProperty.entity;
        let value = rawSetFragment[propertyName];
        if (value === undefined) {
            delete rawSetFragment[propertyName];
            return;
        }
        value = wrapPrimitive(value);
        // If this is not a nested object definition
        if (value.toJSON) {
            if (dbProperty.propertyColumns.length !== 1) {
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update multi-column property to a single value:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}')
			has ${dbProperty.propertyColumns.length + 1} columns 
			but is being updates to a single value.
				`);
            }
            else {
                let dbColumn = dbProperty.propertyColumns[0].column;
                if (dbRelationChain.length) {
                    for (let i = dbRelationChain.length - 1; i >= 0; i--) {
                        const currentDbRelation = dbRelationChain[i];
                        const matchingManyRelationColumn = currentDbRelation.manyRelationColumns.filter((manyRelationColumn) => {
                            return manyRelationColumn.manyColumn.index ===
                                dbColumn.index;
                        })[0];
                        dbColumn = matchingManyRelationColumn.oneColumn;
                    }
                }
                if (jsonSetClause[dbColumn.name]) {
                    const firstProperty = dbPropertyChain[0];
                    throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update the same column multiple times in the same statement:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}')
	maps to table: ${firstProperty.entity.tableConfig.name}, column: ${dbColumn.name}
		which has already been set in this update statement (above).
				`);
                }
                jsonSetClause[dbColumn.name] = value.toJSON(this.columnAliases, false, queryUtils, fieldUtils);
                return;
            }
        }
        // This should be a nested property definition
        else {
            if (typeof value === 'object') {
                const dbRelation = dbProperty.relation[0];
                const childDbRelationChain = [...dbRelationChain];
                childDbRelationChain.push(dbRelation);
                switch (dbRelation.relationType) {
                    case EntityRelationType.MANY_TO_ONE: {
                        this.setEntityFragmentsToJSON(value, jsonSetClause, dbPropertyChain, dbRelation.relationEntity.propertyMap, childDbRelationChain, queryUtils, fieldUtils);
                        break;
                    }
                    case EntityRelationType.ONE_TO_MANY:
                        // Not  nested property definition
                        throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Cannot update @OneToMany properties:
					Property: '${propertyName}' of entity: '${this.rawUpdate.update.__driver__.dbEntity.name}
					is a @OneToMany relation and cannot be updated since it is
					assumed to be based on @Id columns (which cannot be updated).'
				`);
                    default:
                        // Not  nested property definition
                        throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Undefined relation type: 
					Property: '${propertyName}' of entity: '${this.rawUpdate.update.__driver__.dbEntity.name}'
					is defined with an unknown type of a relation.  Expecting either
					@ManyToOne(...)
					or
					@OneToMany(...)
				`);
                }
                return;
            }
            else {
                // Not  nested property definition
                throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Unexpected value ${JSON.stringify(value)} 
					for property: '${propertyName}' of entity: '${this.rawUpdate.update.__driver__.dbEntity.name}'
				Expecting a nested property definition.
				`);
            }
        }
    }
    getPropertyChainDesription(dbPropertyChain) {
        const rootDbEntity = dbPropertyChain[0].entity;
        let prefix = '    ';
        let lastPrefix = '';
        let ending = `...
}`;
        let message = `
Updated Entity: ${rootDbEntity.name}, property chain:
{`;
        const maxChainDepth = dbPropertyChain.length;
        for (let i = 0; i < maxChainDepth; i++) {
            let dbProperty = dbPropertyChain[i];
            message += `${prefix}${dbProperty.name}: `;
            if (i + 1 < maxChainDepth) {
                message += `: {\n`;
            }
            else {
                message += 'VALUE';
            }
            ending = prefix + `...
${lastPrefix}}`;
            lastPrefix = prefix;
            prefix += '    ';
        }
        return `${message}
${ending}`;
    }
}
//# sourceMappingURL=UpdateProperties.js.map