export declare const APPLICATION: {
    domain: string;
    index: any;
    name: string;
    sinceVersion: number;
    versions: {
        api: {
            apiObjectMap: {};
        };
        entities: ({
            columns: ({
                allocationSize: number;
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
            } | {
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
                allocationSize?: undefined;
            } | {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: {
                    manyRelationIndex: number;
                    oneApplicationIndex: any;
                    oneTableIndex: number;
                    oneRelationIndex: number;
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
                allocationSize?: undefined;
            })[];
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
            relations: ({
                index: number;
                isId: boolean;
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
                oneToManyElems?: undefined;
            } | {
                index: number;
                isId: boolean;
                oneToManyElems: {
                    mappedBy: string;
                };
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
            })[];
            sinceVersion: number;
            tableConfig: {
                name: string;
                columnIndexes: {
                    name: string;
                    columnList: string[];
                    unique: boolean;
                }[];
            };
            operations?: undefined;
        } | {
            columns: {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: {
                    manyRelationIndex: number;
                    oneApplicationIndex: number;
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
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                relationTableApplicationIndex: number;
                sinceVersion: number;
            }[];
            sinceVersion: number;
            tableConfig: {
                columnIndexes: any[];
                name?: undefined;
            };
            operations: {};
        } | {
            columns: {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: {
                    manyRelationIndex: number;
                    oneApplicationIndex: number;
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
            relations: ({
                index: number;
                isId: boolean;
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                relationTableApplicationIndex: number;
                sinceVersion: number;
                oneToManyElems?: undefined;
            } | {
                index: number;
                isId: boolean;
                oneToManyElems: {
                    mappedBy: string;
                };
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
                relationTableApplicationIndex?: undefined;
            })[];
            sinceVersion: number;
            tableConfig: {
                name: string;
                columnIndexes: any[];
            };
            operations: {};
        } | {
            columns: ({
                allocationSize: number;
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
            } | {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: {
                    manyRelationIndex: number;
                    oneApplicationIndex: any;
                    oneTableIndex: number;
                    oneRelationIndex: number;
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
                allocationSize?: undefined;
            })[];
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
            relations: ({
                index: number;
                isId: boolean;
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
                oneToManyElems?: undefined;
            } | {
                index: number;
                isId: boolean;
                oneToManyElems: {
                    mappedBy: string;
                };
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
            })[];
            sinceVersion: number;
            tableConfig: {
                name: string;
                columnIndexes: any[];
            };
            operations: {};
        } | {
            columns: ({
                allocationSize: number;
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
            } | {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: {
                    manyRelationIndex: number;
                    oneApplicationIndex: number;
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
                allocationSize?: undefined;
            } | {
                index: number;
                isGenerated: boolean;
                manyRelationColumnRefs: {
                    manyRelationIndex: number;
                    oneApplicationIndex: any;
                    oneTableIndex: number;
                    oneRelationIndex: number;
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
                allocationSize?: undefined;
            })[];
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
            relations: ({
                index: number;
                isId: boolean;
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                relationTableApplicationIndex: number;
                sinceVersion: number;
                oneToManyElems?: undefined;
            } | {
                index: number;
                isId: boolean;
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
                relationTableApplicationIndex?: undefined;
                oneToManyElems?: undefined;
            } | {
                index: number;
                isId: boolean;
                oneToManyElems: {
                    mappedBy: string;
                };
                relationType: string;
                propertyRef: {
                    index: number;
                };
                relationTableIndex: number;
                sinceVersion: number;
                relationTableApplicationIndex?: undefined;
            })[];
            sinceVersion: number;
            tableConfig: {
                name: string;
                columnIndexes: any[];
            };
            operations?: undefined;
        })[];
        integerVersion: number;
        referencedApplications: {
            domain: string;
            index: number;
            name: string;
            sinceVersion: number;
            versions: {
                entities: any;
                integerVersion: number;
                referencedApplications: any;
                versionString: string;
            }[];
        }[];
        versionString: string;
    }[];
};
//# sourceMappingURL=application.d.ts.map