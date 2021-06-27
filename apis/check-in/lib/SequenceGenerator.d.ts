import { IAirportDatabase } from '@airport/air-control';
import { DbColumn, DbEntity, DbSchema, DbSequence } from '@airport/ground-control';
import { IContext } from '@airport/di';
/**
 * Sequence generator is needed at Airport initialization time. A Dao
 * is responsible for checking that a corresponding sequence is already
 * initialized before it itself can be declared to be initialized.
 */
export interface IIdGeneratorContext extends IContext {
    di: {
        sequenceGenerator: ISequenceGenerator;
    };
    isServer: boolean;
}
export interface ISequenceGenerator {
    exists(dbEntity: DbEntity): boolean;
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[], context: IIdGeneratorContext): Promise<number[][]>;
    initialize(sequences?: DbSequence[]): Promise<void>;
    tempInitialize(sequences?: DbSequence[]): Promise<void>;
}
export declare function setSeqGen(sequenceGenerator: ISequenceGenerator): void;
export declare function diSet(dbSchema: DbSchema, dbEntityId: number): boolean;
export declare function duoDiSet(dbSchema: DbSchema, dbEntityId: number): boolean;
export declare function getSysWideOpId(airDb: IAirportDatabase, sequenceGenerator: ISequenceGenerator): Promise<number>;
//# sourceMappingURL=SequenceGenerator.d.ts.map