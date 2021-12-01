export class GeneratedSummaryBuilder {
    constructor(pathBuilder) {
        this.pathBuilder = pathBuilder;
        this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/generated.ts';
    }
    build() {
        return `export * from './mappedSuperclass'
export * from './qApplication';
export * from './baseDaos';
export * from './baseDuos';
export * from './qInterfaces';
export * from './interfaces';
`;
    }
}
//# sourceMappingURL=GeneratedSummaryBuilder.js.map