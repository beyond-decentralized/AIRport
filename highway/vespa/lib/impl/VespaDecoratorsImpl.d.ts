import { ClassDecorator } from '@airport/air-control';
import { VespaAttributeDecorator, VespaDefault, VespaEntityDecorator, VespaFieldsetConfiguration, VespaIndexing } from '../lingo/VespaDecoratorsLingo';
export declare const Vespa: VespaEntityDecorator;
export declare function Fieldset<VespaEntity>(vespaEntityClass: {
    new (...args: any[]): VespaEntity;
}, fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>): ClassDecorator;
export declare const Default: VespaDefault;
export declare const Attribute: VespaAttributeDecorator;
export declare function VespaIndex(indexing: VespaIndexing): PropertyDecorator;
export declare const vespa: {
    Attribute: VespaAttributeDecorator;
    Default: VespaDefault;
    Entity: VespaEntityDecorator;
    Fieldset: typeof Fieldset;
    Indexing: typeof VespaIndex;
    type: {
        bitmap: number;
        document: number;
        int: number;
        long: number;
        string: number;
    };
};
//# sourceMappingURL=VespaDecoratorsImpl.d.ts.map