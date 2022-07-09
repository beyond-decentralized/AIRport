import { ISequenceGenerator } from '@airport/ground-control';
import { IAirportDatabase } from '../definition/AirportDatabase';
export declare function getSysWideOpId(airDb: IAirportDatabase, sequenceGenerator: ISequenceGenerator): Promise<number>;
export declare function getSysWideOpIds(numSequencesNeeded: number, airportDatabase: IAirportDatabase, sequenceGenerator: ISequenceGenerator): Promise<number[]>;
//# sourceMappingURL=SystemWideOperationIds.d.ts.map