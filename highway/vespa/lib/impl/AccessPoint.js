import { VespaAttribute, VespaDefault, VespaFieldset, VespaEntity, VespaIndex } from './VespaDecoratorsImpl';
import { VespaFieldTypeBitmap, VespaFieldTypeDocument, VespaFieldTypeInt, VespaFieldTypeLong, VespaFieldTypeString, } from './VespaFunctionsImpl';
export const vespa = {
    Attribute: VespaAttribute,
    Default: VespaDefault,
    Entity: VespaEntity,
    Fieldset: VespaFieldset,
    Indexing: VespaIndex,
    type: {
        bitmap: VespaFieldTypeBitmap,
        document: VespaFieldTypeDocument,
        int: VespaFieldTypeInt,
        long: VespaFieldTypeLong,
        string: VespaFieldTypeString,
    },
};
//# sourceMappingURL=AccessPoint.js.map