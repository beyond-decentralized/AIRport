import { ClassDecorator } from '@airport/air-control';
import { VespaAttributeDecorator, VespaDefaultDecorator, VespaDocumentDecorator, VespaFieldsetConfiguration, VespaIndexing } from '../lingo/VespaDecoratorsLingo';
export declare const Document: VespaDocumentDecorator;
export declare function Fieldset<VespaEntity>(vespaEntityClass: {
    new (...args: any[]): VespaEntity;
}, fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>): ClassDecorator;
export declare const Default: VespaDefaultDecorator;
export declare const Attribute: VespaAttributeDecorator;
export declare function Index(indexing: VespaIndexing): PropertyDecorator;
//# sourceMappingURL=VespaDecoratorsImpl.d.ts.map