export interface IDataProcessor {
    addDataForProcessing(userId: number, terminalId: number, repositoryId: number, data: string): boolean;
}
export declare class DataProcessor implements IDataProcessor {
    addDataForProcessing(userId: number, terminalId: number, repositoryId: number, data: string): boolean;
}
//# sourceMappingURL=DataProcessor.d.ts.map