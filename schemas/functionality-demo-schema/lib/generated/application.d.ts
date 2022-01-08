export declare const APPLICATION: {
    domain: string;
    index: any;
    name: string;
    sinceVersion: number;
    versions: {
        api: {
            apiObjectMap: {
                IDemoApi: {
                    operationMap: {
                        addRepository: {
                            isAsync: boolean;
                            parameters: any[];
                        };
                        findAllLevel1WithLevel2: {
                            isAsync: boolean;
                            parameters: any[];
                        };
                        saveChanges: {
                            isAsync: boolean;
                            parameters: any[];
                        };
                        updateAllBoolValues: {
                            isAsync: boolean;
                            parameters: any[];
                        };
                        updateAllNumValues: {
                            isAsync: boolean;
                            parameters: any[];
                        };
                        updateAllStrValues: {
                            isAsync: boolean;
                            parameters: any[];
                        };
                    };
                };
            };
        };
        entities: ({
            columns: {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: any[];
                name: string;
                notNull: boolean;
                propertyRefs: {
                    index: number;
                }[];
                sinceVersion: number;
                type: string;
            }[];
            idColumnRefs: {
                index: number;
            }[];
            index: number;
            isLocal: boolean;
            isRepositoryEntity: boolean;
            name: string;
            properties: ({
                columnRef: {
                    index: number;
                };
                index: number;
                isId: boolean;
                name: string;
                sinceVersion: number;
                relationRef?: undefined;
            } | {
                index: number;
                isId: boolean;
                name: string;
                relationRef: {
                    index: number;
                };
                sinceVersion: number;
                columnRef?: undefined;
            })[];
            relations: {
                index: number;
                isId: boolean;
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
            }[];
            sinceVersion: number;
            tableConfig: {
                columnIndexes: any[];
            };
            operations: {};
        } | {
            columns: {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: {
                    manyRelationIndex: number;
                    oneApplicationIndex: any;
                    oneTableIndex: number;
                    oneColumnIndex: number;
                    sinceVersion: number;
                }[];
                name: string;
                notNull: boolean;
                propertyRefs: {
                    index: number;
                }[];
                sinceVersion: number;
                type: string;
            }[];
            idColumnRefs: {
                index: number;
            }[];
            index: number;
            isLocal: boolean;
            isRepositoryEntity: boolean;
            name: string;
            properties: ({
                columnRef: {
                    index: number;
                };
                index: number;
                isId: boolean;
                name: string;
                sinceVersion: number;
                relationRef?: undefined;
            } | {
                index: number;
                isId: boolean;
                name: string;
                relationRef: {
                    index: number;
                };
                sinceVersion: number;
                columnRef?: undefined;
            })[];
            relations: {
                index: number;
                isId: boolean;
                manyToOneElems: {
                    mappedBy: string;
                };
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
            }[];
            sinceVersion: number;
            tableConfig: {
                columnIndexes: any[];
            };
            operations: {};
        })[];
        integerVersion: number;
        referencedApplications: any[];
        versionString: string;
    }[];
};
//# sourceMappingURL=application.d.ts.map