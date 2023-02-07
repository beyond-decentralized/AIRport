import {
	QAppInternal
} from '@airport/air-traffic-control';
import {
	IContext, IOC
} from '@airport/direction-indicator';
import {
	DbApplication,
	DbApplicationUtils,
	JsonApplication,
	JsonColumn,
	JsonEntity,
	QueryType
} from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/takeoff';

export class NoOpApplicationBuilder
	extends SqlSchemaBuilder {

	async createApplication(
		jsonApplication: JsonApplication,
		context: IContext,
	): Promise<void> {
		const applicationName = IOC.getSync(DbApplicationUtils).
			getDbApplication_FullName(jsonApplication);
		const createApplicationStatement = `CREATE APPLICATION ${applicationName}`;

		await this.storeDriver.query(QueryType.DDL, createApplicationStatement, [],
			context, false);
	}

	getColumnSuffix(
		jsonApplication: JsonApplication,
		jsonEntity: JsonEntity,
		jsonColumn: JsonColumn
	): string {
		return '';
	}

	getCreateTableSuffix(
		jsonApplication: JsonApplication,
		jsonEntity: JsonEntity
	): string {
		return ``;
	}

	async buildAllSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): Promise<any[]> {
		let allSequences: any[] = [];
		for (const jsonApplication of jsonApplications) {
			const qApplication = this.airportDatabase.QM[IOC.getSync(DbApplicationUtils).
				getDbApplication_FullName(jsonApplication)] as QAppInternal;
			for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
				allSequences = allSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
			}
		}

		return allSequences;
	}

	stageSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): any[] {
		let stagedSequences: any[] = [];
		for (const jsonApplication of jsonApplications) {
			const qApplication = this.airportDatabase.QM[IOC.getSync(DbApplicationUtils).
				getDbApplication_FullName(jsonApplication)] as QAppInternal;
			for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
				stagedSequences = stagedSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
			}
		}

		return stagedSequences;
	}

	buildSequences(
		dbApplication: DbApplication,
		jsonEntity: JsonEntity,
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
				applicationIndex: dbApplication.index,
				entityIndex: jsonEntity.index,
				columnIndex: jsonColumn.index,
				incrementBy,
				currentValue: 0
			});
		}

		return sequences;
	}

	protected getIndexSql(
		indexName: string,
		tableName: string,
		columnNameList: string[],
		unique: boolean
	): string {
		return ''
	}

	protected getForeignKeySql(
		tableName: string,
		foreignKeyName: string,
		foreignKeyColumnNames: string[],
		referencedTableName: string,
		referencedColumnNames: string[]
	): string {
		return null
	}

}
