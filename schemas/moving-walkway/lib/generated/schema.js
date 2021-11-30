/* eslint-disable */
export const SCHEMA = {
    "domain": "air",
    "index": null,
    "name": "@airport/moving-walkway",
    "packageName": "@airport/moving-walkway",
    "sinceVersion": 1,
    "versions": [
        {
            "api": {
                "apiObjectMap": {}
            },
            "entities": [
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "COLUMNINDEX",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "SYNCHRONIZATION_CONFLICT_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SynchronizationConflictValues",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "synchronizationConflict",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 1,
                            "isId": true,
                            "name": "columnIndex",
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "SYNCHRONIZATION_CONFLICT_VALUES",
                        "columnIndexes": []
                    },
                    "operations": {}
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "TYPE",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "OVERWRITTEN_RECORD_HISTORY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "OVERWRITING_RECORD_HISTORY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 1,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SynchronizationConflict",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id",
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "overwrittenRecordHistory",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "overwritingRecordHistory",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "values",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 5,
                            "isId": false,
                            "name": "type",
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 0,
                            "relationTableSchemaIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 0,
                            "relationTableSchemaIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "SYNCHRONIZATION_CONFLICT_ID"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "SYNCHRONIZATION_CONFLICT",
                        "columnIndexes": []
                    },
                    "operations": {}
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ACKNOWLEDGED",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "BOOLEAN"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "SYNC_CONFLICT_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "ACTOR_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
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
                    "index": 2,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SynchronizationConflictPendingNotification",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "synchronizationConflict",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "actor",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 2,
                            "isId": false,
                            "name": "acknowledged",
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 3,
                            "relationTableSchemaIndex": 0,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "SYNC_CONFLICT_PENDING_NOTIFICATION",
                        "columnIndexes": []
                    },
                    "operations": {}
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ACTOR_RECORD_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "UPDATED_VALUE",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "ANY"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 8,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "SCHEMA_VERSION_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 6,
                                    "oneColumnIndex": 3,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "SCHEMA_ENTITY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "ACTOR_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 7,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 4,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 3,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "SCHEMA_COLUMN_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 3,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RecordUpdateStage",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id",
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "schemaVersion",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "entity",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "actor",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 5,
                            "isId": false,
                            "name": "actorRecordId",
                            "sinceVersion": 1
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "column",
                            "relationRef": {
                                "index": 4
                            },
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 7,
                            "isId": false,
                            "name": "updatedValue",
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 8,
                            "relationTableSchemaIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 6,
                            "relationTableSchemaIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 3,
                            "relationTableSchemaIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 4,
                            "relationTableSchemaIndex": 1,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "RECORD_UPDATE_STAGE",
                        "columnIndexes": []
                    },
                    "operations": {}
                }
            ],
            "integerVersion": 1,
            "referencedSchemas": [
                {
                    "domain": "air",
                    "index": 0,
                    "name": "@airport/holding-pattern",
                    "packageName": "@airport/holding-pattern",
                    "sinceVersion": 1,
                    "versions": [
                        {
                            "entities": null,
                            "integerVersion": 1,
                            "referencedSchemas": null,
                            "versionString": "1.0.0"
                        }
                    ]
                },
                {
                    "domain": "air",
                    "index": 1,
                    "name": "@airport/traffic-pattern",
                    "packageName": "@airport/traffic-pattern",
                    "sinceVersion": 1,
                    "versions": [
                        {
                            "entities": null,
                            "integerVersion": 1,
                            "referencedSchemas": null,
                            "versionString": "1.0.0"
                        }
                    ]
                }
            ],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map