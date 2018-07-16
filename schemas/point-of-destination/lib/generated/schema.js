"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = {
    "domain": "public",
    "index": null,
    "name": "@airport/point-of-destination",
    "versions": [
        {
            "entities": [
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_DATA",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 9,
                                    "oneColumnIndex": 0
                                },
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 10,
                                    "oneColumnIndex": 2
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                },
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 10,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "DATE_NUMBER",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 1
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "DailyArchive",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "repository",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "dailyArchiveLog",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 2,
                            "isId": false,
                            "name": "repositoryData"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 9,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 10,
                            "relationTableSchemaIndex": 0
                        }
                    ],
                    "tableConfig": {
                        "name": "DAILY_ARCHIVES"
                    }
                }
            ],
            "referencedSchemas": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map