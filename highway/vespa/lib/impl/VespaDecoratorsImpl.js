export const Vespa = function () {
    return function (constructor) {
        // TODO: add runtime logic
    };
};
export function Fieldset(vespaEntityClass, fieldsetConfiguration) {
    return function (constructor) {
        // TODO: add runtime logic
    };
}
export const Default = function () {
    return function (constructor) {
        // TODO: add runtime logic
    };
};
export const Attribute = function (attributeConfiguration) {
    return function (constructor) {
        // TODO: add runtime logic
    };
};
export function VespaIndex(indexing) {
    return function (constructor) {
        // TODO: add runtime logic
    };
}
export const vespa = {
    Attribute: Attribute,
    Default: Default,
    Entity: Vespa,
    Fieldset: Fieldset,
    Indexing: VespaIndex,
    type: {
        bitmap: 1,
        document: 1,
        int: 1,
        long: 1,
        string: 1,
    }
};
//# sourceMappingURL=VespaDecoratorsImpl.js.map