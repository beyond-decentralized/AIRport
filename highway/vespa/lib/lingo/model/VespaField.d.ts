export interface IVespaIndexing {
    attribute?: boolean;
    index?: boolean;
    summary?: boolean;
}
export interface IVespaField {
    indexing: IVespaIndexing;
    name: string;
}
export interface IVespaFieldWithProperty extends IVespaField {
    property: any;
}
//# sourceMappingURL=VespaField.d.ts.map