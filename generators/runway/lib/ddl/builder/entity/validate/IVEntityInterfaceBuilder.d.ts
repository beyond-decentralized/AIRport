import { EntityCandidate } from '../../../parser/EntityCandidate';
import { IBuilder } from '../../Builder';
import { VEntityBuilder } from './VEntityBuilder';
import { VPropertyBuilder } from './VPropertyBuilder';
import { VRelationBuilder } from './VRelationBuilder';
import { VTransientBuilder } from './VTransientBuilder';
/**
 * Created by Papa on 5/20/2016.
 */
export declare class IVEntityInterfaceBuilder implements IBuilder {
    entity: EntityCandidate;
    idPropertyBuilders: VPropertyBuilder[];
    idRelationBuilders: VRelationBuilder[];
    nonIdPropertyBuilders: VPropertyBuilder[];
    nonIdRelationBuilders: VRelationBuilder[];
    transientPropertyBuilders: VTransientBuilder[];
    constructor(entity: EntityCandidate, vEntityBuilder: VEntityBuilder);
    build(): string;
}
//# sourceMappingURL=IVEntityInterfaceBuilder.d.ts.map