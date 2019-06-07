import { JsonInsertValues } from '@airport/ground-control';
import { IQEntity } from '../../../lingo/core/entity/Entity';
import { RawInsertValues } from '../../../lingo/query/facade/InsertValues';
import { AbstractInsertValues } from './AbstractInsertValues';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class InsertValues<IQE extends IQEntity> extends AbstractInsertValues<IQE, RawInsertValues<IQE>> {
    toJSON(): JsonInsertValues;
}
