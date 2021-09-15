import {
	ColumnIndex,
	DatabaseOneToManyElements,
	DbEntity,
	DbSchema,
	EntityRelationType,
	getSqlDataType,
	JsonOperation,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	JsonSchemaProperty,
	JsonSchemaRelation,
	SchemaIndex,
	SchemaReferenceByIndex,
	TableIndex
}                          from '@airport/ground-control';
import { JsonSchemaWithApi } from '../../../../../../apis/security-check/lib';
import { currentSchemaApi } from '../../../api/parser/ApiGenerator';
import { Configuration }   from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { SIndexedEntity }  from './SEntity';
import { SRelation }       from './SProperty';
import {
	SIndexedSchema,
	SSchemaReference
}                          from './SSchema';
import { SSchemaBuilder }  from './SSchemaBuilder';

export class JsonSchemaBuilder {

	existingSchema: JsonSchema;

	// schemaVarName = 'SCHEMA'

	constructor(
		private config: Configuration,
		private entityMapByName: { [entityName: string]: EntityCandidate },
		existingSchemaString: string
	) {
		if (existingSchemaString) {
			// const indexOfAssignment = existingSchemaString.indexOf(this.schemaVarName + ' = {')
			//
			// const errorMessage = `Could not parse existing schema, make sure file starts with with:
			// 	 "export const ${this.schemaVarName} = {"
			// 	 where "{" marks the start of the schema definition, and ends with:
			// 	 "};"
			// 	 where "}" marks the end of the schema definition.`
			//
			// if (indexOfAssignment < 0) {
			// 	throw new Error(errorMessage)
			// }
			// if (existingSchemaString.indexOf('};') !== existingSchemaString.length - 2) {
			// 	throw new Error(errorMessage)
			// }
			//
			// existingSchemaString = existingSchemaString.substring(indexOfAssignment + 9,
			// existingSchemaString.length - 1)

			this.existingSchema = JSON.parse(existingSchemaString);
		}
	}

	build(
		domain: string,
		schemaMapByProjectName: { [projectName: string]: DbSchema },
		entityOperationMap: { [entityName: string]: { [operationName: string]: JsonOperation } }
	): [JsonSchemaWithApi, SIndexedSchema] {
		const sSchemaBuilder = new SSchemaBuilder(this.config, this.entityMapByName);

		const sIndexedSchema = sSchemaBuilder.build(schemaMapByProjectName);

		const jsonSchema = this.convertSIndexedSchemaToJsonSchema(domain, sIndexedSchema);

		// TODO: reset table and column and relation indexes based on existing schema

		return [jsonSchema, sIndexedSchema];
	}

	addOperations(
		jsonSchema: JsonSchema,
		entityOperationMap: { [entityName: string]: { [operationName: string]: JsonOperation } }
	) {
		jsonSchema.versions[jsonSchema.versions.length - 1].entities.forEach(jsonEntity => {
			let entityOperations = entityOperationMap[jsonEntity.name];
			if (!entityOperations) {
				return;
			}
			jsonEntity.operations = entityOperations;
		});
	}

	private convertSIndexedSchemaToJsonSchema(
		domain: string,
		sIndexedSchema: SIndexedSchema,
	): JsonSchemaWithApi {
		const jsonEntities: JsonSchemaEntity[] = sIndexedSchema.entities.map(
			sIndexedEntity => {
				const sEntity                     = sIndexedEntity.entity;
				const columns: JsonSchemaColumn[] = sIndexedEntity.columns.map(
					sColumn => {
						const jsonColumn: JsonSchemaColumn = {
							allocationSize: sColumn.allocationSize,
							// columnDefinition: sColumn.columnDefinition,
							index: sColumn.index,
							isGenerated: sColumn.isGenerated === undefined ? false : sColumn.isGenerated,
							manyRelationColumnRefs: [],
							name: sColumn.name,
							notNull: sColumn.notNull,
							propertyRefs: sColumn.propertyRefs.map(
								index => ({
									index
								})),
							sinceVersion: 1,
							type: getSqlDataType(sColumn.type),
						};
						if (sColumn.precision) {
							jsonColumn.precision = sColumn.precision;
						}
						if (sColumn.scale) {
							jsonColumn.scale = sColumn.scale;
						}
						return jsonColumn;
					});
				columns.sort((
					a,
					b
					) =>
						a.index < b.index ? -1 : 1
				);

				const [properties, relations] = this.getPropertiesAndRelations(sIndexedSchema, sIndexedEntity, columns);

				return {
					columns,
					idColumnRefs: this.getIdColumnReferences(sIndexedEntity),
					index: sEntity.tableIndex,
					isLocal: sEntity.isLocal,
					isRepositoryEntity: sEntity.isRepositoryEntity,
					name: sEntity.name,
					properties: properties,
					relations: relations,
					sinceVersion: 1,
					tableConfig: sEntity.table,
				};
			});

		// FIXME: add schema versioning support
		return {
			domain,
			index: null,
			name: sIndexedSchema.schema.name,
			packageName: sIndexedSchema.schema.name,
			sinceVersion: 1,
			versions: [{
				api: currentSchemaApi,
				entities: jsonEntities,
				integerVersion: 1,
				referencedSchemas: sIndexedSchema.schema.referencedSchemas.map((
					sSchemaReference: SSchemaReference
				) => ({
					domain: sSchemaReference.dbSchema.domain.name,
					index: sSchemaReference.index,
					name: sSchemaReference.dbSchema.name,
					packageName: sSchemaReference.dbSchema.packageName,
					sinceVersion: 1,
					versions: [{
						entities: null,
						integerVersion: 1,
						referencedSchemas: null,
						versionString: '1.0.0'
					}]
				})),
				versionString: '1.0.0'
			}]
		};
	}

	private getIdColumnReferences(
		sIndexedEntity: SIndexedEntity
	): SchemaReferenceByIndex<ColumnIndex>[] {
		return sIndexedEntity.idColumns.map(
			sColumn => ({
				index: sColumn.index
			}));
	}

	private getPropertiesAndRelations(
		sIndexedSchema: SIndexedSchema,
		sIndexedEntity: SIndexedEntity,
		columns: JsonSchemaColumn[],
	): [JsonSchemaProperty[], JsonSchemaRelation[]] {
		const relations  = [];
		const properties = sIndexedEntity.entity.properties.map((
			sProperty,
			index
		) => {
			let columnRef;
			let relationRef;

			const sRelation = sProperty.relation;
			if (!sRelation) {
				const sColumn = sProperty.columns[0];
				columnRef     = {
					index: sColumn.index
				};

			} else {
				let relationTableSchemaIndex: number;
				let relationSchemaIndex: SchemaIndex;
				let relationTableIndex: TableIndex;
				let relatedIndexedEntity: SIndexedEntity | DbEntity;
				if (sRelation.referencedSchemaIndex || sRelation.referencedSchemaIndex === 0) {
					relationTableSchemaIndex = sRelation.referencedSchemaIndex;
					const relatedDbSchema    = sIndexedSchema.schema.referencedSchemas[sRelation.referencedSchemaIndex];
					relationSchemaIndex      = relatedDbSchema.index;
					relatedIndexedEntity     = relatedDbSchema.dbSchema
						.currentVersion[0].schemaVersion.entityMapByName[sRelation.entityName];
					relationTableIndex       = relatedIndexedEntity.index;
				} else {
					relatedIndexedEntity = sIndexedSchema.entityMapByName[sRelation.entityName];
					relationSchemaIndex  = null;
					relationTableIndex   = relatedIndexedEntity.entity.tableIndex;
				}

				this.buildColumnRelations(
					sIndexedEntity, sRelation, relatedIndexedEntity,
					relationSchemaIndex, relationTableIndex, columns);

				const relation: JsonSchemaRelation = {
					// addToJoinFunction: sRelation.addToJoinFunction,
					foreignKey: sRelation.foreignKey,
					index: sRelation.index,
					isId: sProperty.isId,
					// isRepositoryJoin: sRelation.repositoryJoin,
					// joinFunctionWithOperator: sRelation.joinFunctionWithOperator,
					manyToOneElems: sRelation.manyToOne,
					oneToManyElems: this.prepOneToManyElems(sRelation.oneToMany),
					relationType: sRelation.relationType,
					propertyRef: {
						index: index
					},
					relationTableIndex,
					relationTableSchemaIndex,
					sinceVersion: 1
				};
				relations[sRelation.index]         = relation;
				relationRef                        = {
					index: sRelation.index
				};
			}

			return {
				columnRef,
				index,
				isId: sProperty.isId,
				name: sProperty.name,
				relationRef,
				sinceVersion: 1
			};
		});

		return [properties, relations];
	}

	private buildColumnRelations(
		sIndexedEntity: SIndexedEntity,
		sRelation: SRelation,
		relatedIndexedEntity: SIndexedEntity | DbEntity,
		relationSchemaIndex: number,
		relationTableIndex: number,
		columns: JsonSchemaColumn[]
	): void {
		switch (sRelation.relationType) {
			case EntityRelationType.MANY_TO_ONE:
				break;
			case EntityRelationType.ONE_TO_MANY:
				// Currently only need to build manyRelationColumnRefs for ManyToOne relations.
				return;
			default:
				throw new Error(`Unknown relation type: ${sRelation.relationType}.`);
		}
		sRelation.sRelationColumns.map(
			sRelationColumn => {
				if (!sRelationColumn.manyToOne) {
					return;
				}
				let ownColumnIndex;
				// if (sRelationColumn.ownColumnIdIndex) {
				// 	ownColumnIndex = sIndexedEntity.idColumns[sRelationColumn.ownColumnIdIndex].index
				// } else {
				ownColumnIndex = sIndexedEntity.columnMap[sRelationColumn.ownColumnReference].index;
				// }
				let relationColumnIndex;
				// if (sRelationColumn.relationColumnIdIndex
				// 	|| sRelationColumn.relationColumnIdIndex == 0) {
				// 	relationColumnIndex =
				// relatedIndexedEntity.idColumns[sRelationColumn.relationColumnIdIndex].index } else {
				relationColumnIndex = relatedIndexedEntity.columnMap[sRelationColumn.relationColumnReference].index;
				// }

				const column = columns[ownColumnIndex];

				column.manyRelationColumnRefs.push({
					manyRelationIndex: sRelation.index,
					oneSchemaIndex: relationSchemaIndex,
					oneTableIndex: relationTableIndex,
					oneRelationIndex: sRelationColumn.oneSideRelationIndex,
					oneColumnIndex: relationColumnIndex,
					sinceVersion: 1
				});

			});
	}

	private prepOneToManyElems(
		elems: DatabaseOneToManyElements
	): DatabaseOneToManyElements {
		if (!elems) {
			return elems;
		}
		return {
			mappedBy: elems.mappedBy
		};
	}

}
