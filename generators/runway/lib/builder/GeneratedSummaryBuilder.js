"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneratedSummaryBuilder {
    constructor(pathBuilder) {
        this.pathBuilder = pathBuilder;
        this.generatedListingFilePath = pathBuilder.fullGeneratedDirPath + '/generated.ts';
    }
    build() {
        return `export * from './mappedSuperclass'
export * from './qSchema';
export * from './baseDaos';
export * from './baseDuos';
export * from './qInterfaces';
export * from './interfaces';
`;
    }
}
exports.GeneratedSummaryBuilder = GeneratedSummaryBuilder;
//# sourceMappingURL=GeneratedSummaryBuilder.js.map