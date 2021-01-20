import {
	AIR_DB,
	IAirportDatabase,
	QSchemaInternal
}                           from '@airport/air-control';
import {
	container,
	IContext
}                           from '@airport/di';
import {
	DbSchema,
	getSchemaName,
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	QueryType
}                           from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';

export class NoOpSchemaBuilder
	extends SqlSchemaBuilder {

	async createSchema(
		jsonSchema: JsonSchema,
		storeDriver: IStoreDriver,
		context: IContext,
	): Promise<void> {
		const schemaName            = getSchemaName(jsonSchema);
		const createSchemaStatement = `CREATE SCHEMA ${schemaName}`;

		await storeDriver.query(QueryType.DDL, createSchemaStatement, [],
			context, false);
	}

	getColumnSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): string {
		return '';
	}

	getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string {
		return ``;
	}

	async buildAllSequences(
		jsonSchemas: JsonSchema[],
		context: IContext,
	): Promise<any[]> {
		let airDb = await container(this).get(AIR_DB);

		let allSequences: any[] = [];
		for (const jsonSchema of jsonSchemas) {
			const qSchema = airDb.QM[getSchemaName(jsonSchema)] as QSchemaInternal;
			for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
				allSequences = allSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
			}
		}

		return allSequences;
	}

	stageSequences(
		jsonSchemas: JsonSchema[],
		airDb: IAirportDatabase,
		context: IContext,
	): any[] {
		let stagedSequences: any[] = [];
		for (const jsonSchema of jsonSchemas) {
			const qSchema = airDb.QM[getSchemaName(jsonSchema)] as QSchemaInternal;
			for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
				stagedSequences = stagedSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
			}
		}

		return stagedSequences;
	}

	buildSequences(
		dbSchema: DbSchema,
		jsonEntity: JsonSchemaEntity,
	): any[] {
		const sequences: any[] = [];
		for (const jsonColumn of jsonEntity.columns) {
			if (!jsonColumn.isGenerated) {
				continue;
			}
			let incrementBy = jsonColumn.allocationSize;
			if (!incrementBy) {
				incrementBy = 10000;
			}

			sequences.push({
				schemaIndex: dbSchema.index,
				tableIndex: jsonEntity.index,
				columnIndex: jsonColumn.index,
				incrementBy,
				currentValue: 0
			});
		}

		return sequences;
	}

}
