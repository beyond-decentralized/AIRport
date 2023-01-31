export type SystemWideOperationId_Id = number;

export interface DbSystemWideOperationIdUtils {

    getSysWideOpId(
    ): Promise<number>

    getSysWideOpIds(
        numSequencesNeeded: number,
    ): Promise<number[]>

}
