import { TypeOrParamDocEntry } from '../../parser/DocEntry';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { IBuilder } from '../Builder';
import { QEntityBuilder } from './query/QEntityBuilder';
import { QPropertyBuilder } from './query/QPropertyBuilder';
import { QRelationBuilder } from './query/QRelationBuilder';
import { QTransientBuilder } from './query/QTransientBuilder';
/**
 * Created by Papa on 5/20/2016.
 */
export declare class IEntityInterfaceBuilder implements IBuilder {
    entity: EntityCandidate;
    private qEntityBuilder;
    idPropertyBuilders: QPropertyBuilder[];
    idRelationBuilders: QRelationBuilder[];
    nonIdPropertyBuilders: QPropertyBuilder[];
    nonIdRelationBuilders: QRelationBuilder[];
    transientPropertyBuilders: QTransientBuilder[];
    constructor(entity: EntityCandidate, qEntityBuilder: QEntityBuilder);
    build(): string;
    getTypeString(docEntry: TypeOrParamDocEntry): string;
}
//# sourceMappingURL=IEntityInterfaceBuilder.d.ts.map