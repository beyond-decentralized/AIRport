import {
	CascadeType,
	ColumnIndex,
	DbEntity,
	DbSchema,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	JsonSchemaProperty,
	JsonSchemaRelation,
	DatabaseOneToManyElements,
	SchemaIndex,
	SchemaReferenceByIndex,
	TableIndex
}                        from "@airport/ground-control";
import {
	EntityRelationType,
	getSqlDataType
}                        from "@airport/ground-control";
import {Configuration}   from "../../options/Options";
import {EntityCandidate} from "../../parser/EntityCandidate";
import {SIndexedEntity}  from "./SEntity";
import {SRelation}       from "./SProperty";
import {SIndexedSchema}  from "./SSchema";
import {SSchemaBuilder}  from "./SSchemaBuilder";

export class JsonSchemaBuilder {

	existingSchema: JsonSchema;
	schemaVarName = 'SCHEMA';

	constructor(
		private config: Configuration,
		private entityMapByName: { [entityName: string]: EntityCandidate },
		existingSchemaString: string
	) {
		if (existingSchemaString) {
			const indexOfAssignment = existingSchemaString.indexOf(this.schemaVarName + ' = {');

			const errorMessage = `Could not parse existing schema, make sure file starts with with:
				 "export const ${this.schemaVarName} = {"
				 where "{" marks the start of the schema definition, and ends with:
				 "};"
				 where "}" marks the end of the schema definition.`;

			if (indexOfAssignment < 0) {
				throw errorMessage;
			}
			if (existingSchemaString.indexOf('};') !== existingSchemaString.length - 2) {
				throw errorMessage;
			}

			existingSchemaString = existingSchemaString.substring(indexOfAssignment + 9, existingSchemaString.length - 1);

			this.existingSchema = JSON.parse(existingSchemaString);
		}
	}

	build(
		domain: string,
		schemaMapByProjectName: { [projectName: string]: DbSchema }
	): [string, SIndexedSchema] {
		const sSchemaBuilder = new SSchemaBuilder(this.config, this.entityMapByName);

		const sIndexedSchema = sSchemaBuilder.build(schemaMapByProjectName);

		const jsonSchema = this.convertSIndexedSchemaToJsonSchema(domain, sIndexedSchema);

		// TODO: reset table and column and relation indexes based on existing schema

		const schemaString = `export const ${this.schemaVarName} = `
			+ JSON.stringify(jsonSchema, null, '\t') + ';';

		return [schemaString, sIndexedSchema];
	}

	private convertSIndexedSchemaToJsonSchema(
		domain: string,
		sIndexedSchema: SIndexedSchema,
	): JsonSchema {
		const jsonEntities: JsonSchemaEntity[] = sIndexedSchema.entities.map(
			sIndexedEntity => {
				const sEntity                     = sIndexedEntity.entity;
				const columns: JsonSchemaColumn[] = sIndexedEntity.columns.map(
					sColumn => ({
						columnDefinition: sColumn.columnDefinition,
						index: sColumn.index,
						isGenerated: sColumn.isGenerated,
						manyRelationColumnRefs: [],
						name: sColumn.name,
						propertyRefs: sColumn.propertyRefs.map(
							index => ({
								index
							})),
						type: getSqlDataType(sColumn.type),
					}));
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
					tableConfig: sEntity.table,
				}
			});

		// FIXME: add schema versioning support
		return {
			domain,
			index: null,
			name: sIndexedSchema.schema.name,
			versions: [{
				entities: jsonEntities,
				referencedSchemas: [],
				versionString: "1.0.0"
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
				}

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
						.currentVersion.entityMapByName[sRelation.entityName];
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
					addToJoinFunction: sRelation.addToJoinFunction,
					foreignKey: sRelation.foreignKey,
					index: sRelation.index,
					isId: sProperty.isId,
					// isRepositoryJoin: sRelation.repositoryJoin,
					joinFunctionWithOperator: sRelation.joinFunctionWithOperator,
					manyToOneElems: sRelation.manyToOne,
					oneToManyElems: this.prepOneToManyElems(sRelation.oneToMany),
					relationType: sRelation.relationType,
					propertyRef: {
						index: index
					},
					relationTableIndex,
					relationTableSchemaIndex
				};
				relations[sRelation.index]         = relation;
				relationRef                        = {
					index: sRelation.index
				}
			}

			return {
				columnRef,
				index,
				isId: sProperty.isId,
				name: sProperty.name,
				relationRef
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
				throw `Unknown relation type: ${sRelation.relationType}.`;
		}
		sRelation.sRelationColumns.map(
			sRelationColumn => {
				if (!sRelationColumn.manyToOne) {
					return;
				}
				let ownColumnIndex;
				if (sRelationColumn.ownColumnIdIndex) {
					ownColumnIndex = sIndexedEntity.idColumns[sRelationColumn.ownColumnIdIndex].index;
				} else {
					ownColumnIndex = sIndexedEntity.columnMap[sRelationColumn.ownColumnReference].index;
				}
				let relationColumnIndex;
				if (sRelationColumn.relationColumnIdIndex
					|| sRelationColumn.relationColumnIdIndex == 0) {
					relationColumnIndex = relatedIndexedEntity.idColumns[sRelationColumn.relationColumnIdIndex].index;
				} else {
					relationColumnIndex = relatedIndexedEntity.columnMap[sRelationColumn.relationColumnReference].index;
				}

				const column = columns[ownColumnIndex];

				column.manyRelationColumnRefs.push({
					manyRelationIndex: sRelation.index,
					oneSchemaIndex: relationSchemaIndex,
					oneTableIndex: relationTableIndex,
					oneRelationIndex: sRelationColumn.oneSideRelationIndex,
					oneColumnIndex: relationColumnIndex
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
			cascade: this.deserializeCascadeType(elems.cascade),
			mappedBy: elems.mappedBy
		}
	}

	private deserializeCascadeType(
		cascadeType
	): CascadeType {
		if (!cascadeType) {
			return cascadeType;
		}
		switch (cascadeType) {
			case 'CascadeType.ALL':
				return CascadeType.ALL;
			case 'CascadeType.PERSIST':
				return CascadeType.PERSIST;
			case 'CascadeType.REMOVE':
				return CascadeType.REMOVE;
			default:
				throw `Unknown CascadeType: ${cascadeType}.`;
		}
	}

}