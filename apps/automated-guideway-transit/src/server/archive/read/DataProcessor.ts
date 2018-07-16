export interface IDataProcessor {

	addDataForProcessing(
		userId: number,
		terminalId: number,
		repositoryId: number,
		data: string
	): boolean;

}

export class DataProcessor implements IDataProcessor {

	addDataForProcessing(
		userId: number,
		terminalId: number,
		repositoryId: number,
		data: string
	): boolean {
		throw `Implement!`;
	}

}