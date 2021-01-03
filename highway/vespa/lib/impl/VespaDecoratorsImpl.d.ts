import { ClassDecorator } from '@airport/air-control';
import { VespaAttributeDecorator, VespaDefaultDecorator, VespaEntityDecorator, VespaFieldsetConfiguration, VespaIndexing } from '../lingo/VespaDecoratorsLingo';
export declare const VespaEntity: VespaEntityDecorator;
export declare function VespaFieldset<VespaEntity>(vespaEntityClass: {
    new (...args: any[]): VespaEntity;
}, fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>): ClassDecorator;
export declare const VespaDefault: VespaDefaultDecorator;
export declare const VespaAttribute: VespaAttributeDecorator;
export declare function VespaIndex(indexing: VespaIndexing): PropertyDecorator;
//# sourceMappingURL=VespaDecoratorsImpl.d.ts.map