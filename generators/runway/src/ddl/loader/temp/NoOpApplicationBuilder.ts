import {
	QApplicationInternal
} from '@airport/air-traffic-control';
import {
	IContext
} from '@airport/direction-indicator';
import {
	DbApplication,
	getFullApplicationName,
	JsonApplication,
	JsonApplicationColumn,
	JsonApplicationEntity,
	QueryType
} from '@airport/ground-control';
import { SqlApplicationBuilder } from '@airport/landing';
import {
	IStoreDriver
} from '@airport/terminal-map';

export class NoOpApplicationBuilder
	extends SqlApplicationBuilder {

	async createApplication(
		jsonApplication: JsonApplication,
		context: IContext,
	): Promise<void> {
		const applicationName = getFullApplicationName(jsonApplication);
		const createApplicationStatement = `CREATE APPLICATION ${applicationName}`;

		await this.storeDriver.query(QueryType.DDL, createApplicationStatement, [],
			context, false);
	}

	getColumnSuffix(
		jsonApplication: JsonApplication,
		jsonEntity: JsonApplicationEntity,
		jsonColumn: JsonApplicationColumn
	): string {
		return '';
	}

	getCreateTableSuffix(
		jsonApplication: JsonApplication,
		jsonEntity: JsonApplicationEntity
	): string {
		return ``;
	}

	async buildAllSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): Promise<any[]> {
		let allSequences: any[] = [];
		for (const jsonApplication of jsonApplications) {
			const qApplication = this.airportDatabase.QM[getFullApplicationName(jsonApplication)] as QApplicationInternal;
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
			const qApplication = this.airportDatabase.QM[getFullApplicationName(jsonApplication)] as QApplicationInternal;
			for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
				stagedSequences = stagedSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
			}
		}

		return stagedSequences;
	}

	buildSequences(
		dbApplication: DbApplication,
		jsonEntity: JsonApplicationEntity,
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
				tableIndex: jsonEntity.index,
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
