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
}
export declare var SEQ_GEN: ISequenceGenerator;
export declare function diSet(dbSchema: DbSchema, dbEntityId: number): boolean;
