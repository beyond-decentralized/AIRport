import { EntityCandidate } from '../../parser/EntityCandidate';
import { IBuilder } from '../Builder';
import { QColumnBuilder } from './QColumnBuilder';
import { QEntityBuilder } from './QEntityBuilder';
import { QPropertyBuilder } from './QPropertyBuilder';
import { QRelationBuilder } from './QRelationBuilder';
/**
 * Created by Papa on 5/20/2016.
 */
export declare class IQEntityInterfaceBuilder implements IBuilder {
    entity: EntityCandidate;
    private qEntityBuilder;
    idPropertyBuilders: QPropertyBuilder[];
    idRelationBuilders: QRelationBuilder[];
    nonIdColumnBuilders: QColumnBuilder[];
    nonIdPropertyBuilders: QPropertyBuilder[];
    nonIdRelationBuilders: QRelationBuilder[];
    constructor(entity: EntityCandidate, qEntityBuilder: QEntityBuilder);
    build(): string;
}
//# sourceMappingURL=IQEntityInterfaceBuilder.d.ts.map