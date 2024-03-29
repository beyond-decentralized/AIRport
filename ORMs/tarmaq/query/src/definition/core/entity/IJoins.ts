import { QueryBaseOperation } from "@airport/ground-control";
import { IFrom, IQEntity } from './IQEntity';

/**
 * The X in the JOIN ... ON X clause.
 */
export interface JoinOperation<IF1 extends IFrom, IQE extends IQEntity> {
	( entity1: IQE, entity2: IF1 ): QueryBaseOperation;
}

/**
 * The JOIN ... ON X clause.
 */
export interface IJoinFields<IF1 extends IFrom, IQE extends IQEntity> {
	ON( joinOperation: JoinOperation<IF1, IQE> ): IQE;
}