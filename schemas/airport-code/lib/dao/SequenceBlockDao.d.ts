import { IUtils } from '@airport/air-control';
import { ColumnIndex, SchemaIndex, TableIndex } from '@airport/ground-control';
import { SequenceBlockReservationMillis, SequenceBlockSize, SequenceConsumerId, SequenceId } from '../ddl/ddl';
import { BaseSequenceBlockDao, IBaseSequenceBlockDao, ISequenceBlock } from '../generated/generated';
export interface ISequenceBlockDao extends IBaseSequenceBlockDao {
}
export declare class SequenceBlockDao extends BaseSequenceBlockDao implements ISequenceBlockDao {
    constructor(utils: IUtils);
    createNewBlocks(sequenceConsumerId: SequenceConsumerId, sequenceIds: SequenceId[], schemaIndexes: SchemaIndex[], tableIndexes: TableIndex[], columnIndexes: ColumnIndex[], sizes: SequenceBlockSize[], reservationMillis: SequenceBlockReservationMillis): Promise<ISequenceBlock>;
}
