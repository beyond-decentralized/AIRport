import { ClassDecorator, PropertyDecorator } from '@airport/direction-indicator';
import { IVespaDocument } from '../lingo/model/VespaDocument';
import { IVespaFieldWithDbInfo } from '../lingo/model/VespaField';
import { VespaAttributeDecorator, VespaDefaultDecorator, VespaDocumentDecorator, VespaFieldsetConfiguration, VespaIndexing } from '../lingo/VespaDecoratorsLingo';
export declare const Document: VespaDocumentDecorator;
export declare function Fieldset<VespaEntity>(vespaEntityClass: {
    new (...args: any[]): VespaEntity;
}, fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>): ClassDecorator;
export declare const Default: VespaDefaultDecorator;
export declare const Attribute: VespaAttributeDecorator;
export declare function Index(indexing: VespaIndexing): PropertyDecorator;
export declare function ensureField(document: IVespaDocument, name: string): IVespaFieldWithDbInfo;
//# sourceMappingURL=VespaDecoratorsImpl.d.ts.map