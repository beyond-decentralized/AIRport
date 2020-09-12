import { IAirportDatabase } from '@airport/air-control';
import { DbColumn, DbEntity, DbSchema, DbSequence } from '@airport/ground-control';
/**
 * Sequence generator is needed at Airport initialization time. A Dao
 * is responsible for checking that a corresponding sequence is already
 * initialized before it itself can be declared to be initialized.
 */
export interface ISequenceGenerator {
    exists(dbEntity: DbEntity): boolean;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    init(sequences?: DbSequence[]): Promise<void>;
    tempInit(sequences?: DbSequence[]): Promise<void>;
}
export declare function setSeqGen(sequenceGenerator: ISequenceGenerator): void;
export declare function diSet(dbSchema: DbSchema, dbEntityId: number): boolean;
export declare function duoDiSet(dbSchema: DbSchema, dbEntityId: number): boolean;
export declare function getSysWideOpId(airDb: IAirportDatabase, sequenceGenerator: ISequenceGenerator): Promise<number>;
//# sourceMappingURL=SequenceGenerator.d.ts.map