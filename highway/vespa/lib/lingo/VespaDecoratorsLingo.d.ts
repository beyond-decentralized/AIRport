import { ClassDecorator, PropertyDecorator } from '@airport/direction-indicator';
export interface VespaIndexing {
    attribute?: boolean;
    index?: boolean;
    summary?: boolean;
}
export interface VespaFieldsetConfiguration<VespaEntity> {
    fields: Partial<VespaEntity>;
}
export interface VespaDocumentDecorator {
    (): ClassDecorator;
}
export interface VespaDefaultDecorator {
    (): ClassDecorator;
}
export interface VespaAttributeConfiguration {
    /**
     * Create a B-tree index with B-tree posting lists for the attribute.
     * This speeds up search in the attribute.
     */
    fastSearch?: boolean;
    /**
     * If searchable-copies < redundancy, use fast-access to load the
     * attribute in memory on all nodes with a document replica. Use this
     * for fast access when doing partial updates and when used in a
     * selection expression for garbage collection. If
     * searchable-copies == redundancy (default), this property is a no-op.
     */
    fastAccess?: boolean;
}
export interface VespaAttributeDecorator {
    (attributeConfiguration: VespaAttributeConfiguration): PropertyDecorator;
}
//# sourceMappingURL=VespaDecoratorsLingo.d.ts.map