import { BaseSequenceDao, ISequence, SequenceEId } from '../../schemas/airport-code/lib';
export declare class SequenceDao extends BaseSequenceDao {
    findAll(entityIds?: SequenceEId[]): Promise<ISequence[]>;
}
//# sourceMappingURL=SequenceDao.d.ts.map