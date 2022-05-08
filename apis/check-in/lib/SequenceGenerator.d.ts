import { IAirportDatabase } from '@airport/air-traffic-control';
import { DbColumn, DbEntity, DbApplication, DbSequence } from '@airport/ground-control';
import { IContext } from '@airport/direction-indicator';
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
    generateSequenceNumbers(dbColumns: DbColumn[], numSequencesNeeded: number[]): Promise<number[][]>;
    initialize(context: IContext, sequences?: DbSequence[]): Promise<void>;
    tempInitialize(context: IContext, sequences?: DbSequence[]): Promise<void>;
}
export declare function setSeqGen(sequenceGenerator: ISequenceGenerator): void;
export declare function diSet(dbApplication: DbApplication, dbEntityId: number): boolean;
export declare function duoDiSet(dbApplication: DbApplication, dbEntityId: number): boolean;
export declare function getSysWideOpId(airDb: IAirportDatabase, sequenceGenerator: ISequenceGenerator): Promise<number>;
export declare function getSysWideOpIds(numSequencesNeeded: number, airportDatabase: IAirportDatabase, sequenceGenerator: ISequenceGenerator): Promise<number[]>;
//# sourceMappingURL=SequenceGenerator.d.ts.map