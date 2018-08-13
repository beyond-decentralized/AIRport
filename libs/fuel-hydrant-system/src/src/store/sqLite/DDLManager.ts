/**
 * Created by Papa on 8/31/2016.
 */

export class DDLManager {

	static getCreateDDL(): string[] {

		let createQueries: Promise<any>[] = [];
		throw `Implement!`;
		// let tableName = MetadataUtils.getTableName(entityMetadata, QMetadataUtils.getEntityName(qEntity));
		// let createTableStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnNames.join(' , ')})`;
		//
		// return createTableStatement;
	}

	static getColumnIndexByColumnName(
		globalTableIndex:number,
		columnName: string
	):number {
		throw `Not Implemented`;
	}

	static getRelationIndex(
		applicationName: string,
		entityName:  string,
		propertyName: string
	):number {
		throw `Not Implemented`;
	}

	static getRelationGlobalTableIndex(): number {
		throw `Not Implemented`;
	}

	static getGlobalTableIndex(
		applicationName: string,
		entityName:  string
	): number {
		throw `Not Implemented`;
	}

	static warn( message: string ) {
		console.log(message);
	}
}