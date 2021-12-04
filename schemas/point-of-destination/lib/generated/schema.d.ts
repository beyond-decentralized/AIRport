export declare const SCHEMA: {
    domain: string;
    index: any;
    name: string;
    packageName: string;
    sinceVersion: number;
    versions: {
        api: {
            apiObjectMap: {};
        };
        entities: {
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
                index: number;
                isId: boolean;
                name: string;
                relationRef: {
                    index: number;
                };
                sinceVersion: number;
                columnRef?: undefined;
            } | {
                columnRef: {
                    index: number;
                };
                index: number;
                isId: boolean;
                name: string;
                sinceVersion: number;
                relationRef?: undefined;
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
                name: string;
                indexes: any[];
            };
            operations: {};
        }[];
        integerVersion: number;
        referencedApplications: {
            domain: string;
            index: number;
            name: string;
            packageName: string;
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
//# sourceMappingURL=schema.d.ts.map