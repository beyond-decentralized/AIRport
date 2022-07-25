import { EntityCandidate } from '../../../parser/EntityCandidate';
import { IBuilder } from '../../Builder';
import { VColumnBuilder } from './VColumnBuilder';
import { VEntityBuilder } from './VEntityBuilder';
import { VPropertyBuilder } from './VPropertyBuilder';
import { VRelationBuilder } from './VRelationBuilder';
/**
 * Created by Papa on 5/20/2016.
 */
export declare class IVEntityInterfaceBuilder implements IBuilder {
    entity: EntityCandidate;
    private vEntityBuilder;
    idPropertyBuilders: VPropertyBuilder[];
    idRelationBuilders: VRelationBuilder[];
    nonIdColumnBuilders: VColumnBuilder[];
    nonIdPropertyBuilders: VPropertyBuilder[];
    nonIdRelationBuilders: VRelationBuilder[];
    constructor(entity: EntityCandidate, vEntityBuilder: VEntityBuilder);
    build(): string;
}
//# sourceMappingURL=IVEntityInterfaceBuilder.d.ts.map