import { VespaFieldset, VespaIndex } from './VespaDecoratorsImpl';
import { VespaFieldTypeBitmap, VespaFieldTypeDocument, VespaFieldTypeInt, VespaFieldTypeLong, VespaFieldTypeString } from './VespaFunctionsImpl';
export declare const vespa: {
    Attribute: import("..").VespaAttributeDecorator;
    Default: import("..").VespaDefaultDecorator;
    Entity: import("..").VespaEntityDecorator;
    Fieldset: typeof VespaFieldset;
    Indexing: typeof VespaIndex;
    type: {
        bitmap: typeof VespaFieldTypeBitmap;
        document: typeof VespaFieldTypeDocument;
        int: typeof VespaFieldTypeInt;
        long: typeof VespaFieldTypeLong;
        string: typeof VespaFieldTypeString;
    };
};
//# sourceMappingURL=AccessPoint.d.ts.map