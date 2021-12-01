export interface IApplicationCollector {

	collect(): Promise<string[]>
}

export class ApplicationCollector
	implements IApplicationCollector {

	async collect(): Promise<string[]> {
		return [];
	}
}
