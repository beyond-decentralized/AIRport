export declare const SCHEMA: {
    "domain": string;
    "index": any;
    "name": string;
    "versions": {
        "entities": ({
            "columns": ({
                "allocationSize": number;
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": number;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "relationTableSchemaIndex"?: undefined;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "relationTableSchemaIndex": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "cascade": number;
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "relationTableSchemaIndex"?: undefined;
            })[];
            "tableConfig": {
                "name": string;
                "indexes"?: undefined;
                "primaryKey"?: undefined;
            };
        } | {
            "columns": ({
                "allocationSize": number;
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "cascade": number;
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
            })[];
            "tableConfig": {
                "name": string;
                "indexes": {
                    "name": string;
                    "columnList": string[];
                    "unique": boolean;
                }[];
                "primaryKey"?: undefined;
            };
        } | {
            "columns": ({
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            } | {
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            })[];
            "relations": {
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
            }[];
            "tableConfig": {
                "name": string;
                "primaryKey": string[];
                "indexes"?: undefined;
            };
        } | {
            "columns": ({
                "allocationSize": number;
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            } | {
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneRelationIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": any;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "allocationSize"?: undefined;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "mappedBy": string;
                    "cascade"?: undefined;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "cascade": number;
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
            })[];
            "tableConfig": {
                "name": string;
                "indexes"?: undefined;
                "primaryKey"?: undefined;
            };
        } | {
            "columns": ({
                "index": number;
                "isGenerated": boolean;
                "manyRelationColumnRefs": any[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
            } | {
                "index": number;
                "manyRelationColumnRefs": {
                    "manyRelationIndex": number;
                    "oneSchemaIndex": number;
                    "oneTableIndex": number;
                    "oneColumnIndex": number;
                }[];
                "name": string;
                "propertyRefs": {
                    "index": number;
                }[];
                "type": number;
                "isGenerated"?: undefined;
            })[];
            "idColumnRefs": {
                "index": number;
            }[];
            "index": number;
            "isLocal": boolean;
            "isRepositoryEntity": boolean;
            "name": string;
            "properties": ({
                "columnRef": {
                    "index": number;
                };
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "name": string;
                "relationRef": {
                    "index": number;
                };
                "columnRef"?: undefined;
            })[];
            "relations": ({
                "index": number;
                "isId": boolean;
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "relationTableSchemaIndex": number;
                "oneToManyElems"?: undefined;
            } | {
                "index": number;
                "isId": boolean;
                "oneToManyElems": {
                    "cascade": number;
                    "mappedBy": string;
                };
                "relationType": number;
                "propertyRef": {
                    "index": number;
                };
                "relationTableIndex": number;
                "relationTableSchemaIndex"?: undefined;
            })[];
            "tableConfig"?: undefined;
        })[];
        "integerVersion": number;
        "referencedSchemas": any[];
        "versionString": string;
    }[];
};
