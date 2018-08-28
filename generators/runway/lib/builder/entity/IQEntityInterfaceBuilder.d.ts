import { TypeOrParamDocEntry } from '../../parser/DocEntry';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { IQBuilder } from './../QBuilder';
import { QColumnBuilder } from './QColumnBuilder';
import { QEntityBuilder } from './QEntityBuilder';
import { QPropertyBuilder } from './QPropertyBuilder';
import { QRelationBuilder } from './QRelationBuilder';
import { QTransientBuilder } from './QTransientBuilder';
/**
 * Created by Papa on 5/20/2016.
 */
export declare class IQEntityInterfaceBuilder implements IQBuilder {
    entity: EntityCandidate;
    private qEntityBuilder;
    idPropertyBuilders: QPropertyBuilder[];
    idRelationBuilders: QRelationBuilder[];
    nonIdColumnBuilders: QColumnBuilder[];
    nonIdPropertyBuilders: QPropertyBuilder[];
    nonIdRelationBuilders: QRelationBuilder[];
    transientPropertyBuilders: QTransientBuilder[];
    constructor(entity: EntityCandidate, qEntityBuilder: QEntityBuilder);
    build(): string;
    getTypeString(docEntry: TypeOrParamDocEntry): string;
}
