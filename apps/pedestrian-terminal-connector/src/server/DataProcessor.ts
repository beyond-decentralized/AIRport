export interface IDataProcessor {

	addDataForProcessing(
		userId: number,
		databaseId: number,
		repositoryId: number,
		data: string
	): boolean;

}

export class DataProcessor
	implements IDataProcessor {

	addDataForProcessing(
		userId: number,
		databaseId: number,
		repositoryId: number,
		data: string
	): boolean {
		throw new Error(`Implement!`)
	}

}
