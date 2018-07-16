"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = {
    "domain": "public",
    "index": null,
    "name": "@airport/holding-pattern",
    "versions": [
        {
            "entities": [
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ORDER_NUMBER",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "CHANGE_TYPE",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 5,
                                    "oneRelationIndex": 4,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_TRANSACTION_HISTORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 7,
                                    "oneColumnIndex": 0
                                },
                                {
                                    "manyRelationIndex": 2,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 5
                                }
                            ],
                            "name": "SCHEMA_VERSION_ID",
                            "propertyRefs": [
                                {
                                    "index": 4
                                },
                                {
                                    "index": 5
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 5,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ENTITY_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        },
                        {
                            "index": 3
                        }
                    ],
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "OperationHistory",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "repositoryTransactionHistory",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "orderNumber"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 3,
                            "isId": false,
                            "name": "changeType"
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "schemaVersion",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "entity",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "recordHistory",
                            "relationRef": {
                                "index": 3
                            }
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
                                "index": 1
                            },
                            "relationTableIndex": 5
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 7,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "operationHistory"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_OPERATION_HISTORY"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ACTOR_RECORD_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 7,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ACTOR_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 0,
                                    "oneRelationIndex": 3,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_OPERATION_HISTORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
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
                    "name": "RecordHistory",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "actor",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "actorRecordId"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "operationHistory",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "newValues",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "oldValues",
                            "relationRef": {
                                "index": 3
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 7
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 0
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "recordHistory"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 2
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "recordHistory"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 3
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_RECORD_HISTORY",
                        "indexes": [
                            {
                                "name": "RCRD_HSTR_TO_OPRTN_HSTR_FX",
                                "columnList": [
                                    "REPOSITORY_OPERATION_HISTORY_ID"
                                ],
                                "unique": false
                            }
                        ]
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "COLUMN_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NEW_VALUE",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 0
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 1,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_RECORD_HISTORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 2,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RecordHistoryNewValue",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "recordHistory",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 1,
                            "isId": true,
                            "name": "columnIndex"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "newValue"
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
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_RECORD_HISTORY_NEW_VALUES",
                        "primaryKey": [
                            "REPOSITORY_RECORD_HISTORY_ID",
                            "COLUMN_INDEX"
                        ]
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "COLUMN_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "OLD_VALUE",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 0
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 1,
                                    "oneRelationIndex": 3,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_RECORD_HISTORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 3,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RecordHistoryOldValue",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "recordHistory",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 1,
                            "isId": true,
                            "name": "columnIndex"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "oldValue"
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
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_RECORD_HISTORY_OLD_VALUES",
                        "primaryKey": [
                            "REPOSITORY_RECORD_HISTORY_ID",
                            "COLUMN_INDEX"
                        ]
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REFERENCE_TYPE",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 5,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_TRANSACTION_HISTORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 11,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 7,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ACTOR_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 4,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepoTransHistoryChangedRepositoryActor",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "repositoryTransactionHistory",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "actor",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 4,
                            "isId": false,
                            "name": "referenceType"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 5
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 11
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 7
                        }
                    ],
                    "tableConfig": {
                        "name": "REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REMOTE_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SAVE_TIMESTAMP",
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "type": 2
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_TRANSACTION_TYPE",
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID",
                            "propertyRefs": [
                                {
                                    "index": 8
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 5,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 6,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "TRANSACTION_HISTORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 6,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 11,
                                    "oneRelationIndex": 3,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 7,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 7,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ACTOR_ID",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 5,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepositoryTransactionHistory",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "remoteId"
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "transactionHistory",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "changedRepositoryActors",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "actor",
                            "relationRef": {
                                "index": 3
                            }
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 6,
                            "isId": false,
                            "name": "saveTimestamp"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 7,
                            "isId": false,
                            "name": "repositoryTransactionType"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 8,
                            "isId": false,
                            "name": "blockId"
                        },
                        {
                            "index": 9,
                            "isId": false,
                            "name": "operationHistory",
                            "relationRef": {
                                "index": 4
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 6
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 11
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "mappedBy": "repositoryTransactionHistory"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 4
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 7
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "repositoryTransactionHistory"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 9
                            },
                            "relationTableIndex": 0
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_TRANSACTION_HISTORY"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "TRANSACTION_TYPE",
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
                            "index": 0
                        }
                    ],
                    "index": 6,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "TransactionHistory",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "transactionType"
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "repositoryTransactionHistories",
                            "relationRef": {
                                "index": 0
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "mappedBy": "repoTransHistory"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 5
                        }
                    ],
                    "tableConfig": {
                        "name": "TRANSACTION_HISTORY"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "RANDOM_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 10,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "USER_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 9,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "DATABASE_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 7,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Actor",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "user",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "database",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 3,
                            "isId": false,
                            "name": "randomId"
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "actorApplications",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "repositoryActor",
                            "relationRef": {
                                "index": 3
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 10
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 9
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "actor"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 14
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "ACTOR_ID"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 12
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "HOST",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PORT",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 8,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Application",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "host"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "port"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "actorApplications",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "repositoryApplications",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "application"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 14
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "application"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 15
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SECOND_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "IS_LOCAL",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 1
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 10,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "OWNER_USER_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 9,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Database",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "name"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "secondId"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "owner",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 4,
                            "isId": false,
                            "name": "isLocal"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 10
                        }
                    ]
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "UNIQUE_IDENTIFIER",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "FIRST_NAME",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "LAST_NAME",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "MIDDLE_NAME",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PHONE",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 5
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 10,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "User",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "uniqueId"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "firstName"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "lastName"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 4,
                            "isId": false,
                            "name": "middleName"
                        },
                        {
                            "columnRef": {
                                "index": 5
                            },
                            "index": 5,
                            "isId": false,
                            "name": "phone"
                        }
                    ],
                    "relations": []
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ORDERED_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "RANDOM_ID",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_URL",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DISTRIBUTION_STRATEGY",
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_PLATFORM",
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 7,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PLATFORM_CONFIG",
                            "propertyRefs": [
                                {
                                    "index": 8
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 8,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SYNC_PRIORITY",
                            "propertyRefs": [
                                {
                                    "index": 12
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 9,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 7,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "OWNER_ACTOR_ID",
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
                            "index": 0
                        }
                    ],
                    "index": 11,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Repository",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "ownerActor",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "orderedId"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 3,
                            "isId": false,
                            "name": "randomId"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 4,
                            "isId": false,
                            "name": "name"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 5,
                            "isId": false,
                            "name": "url"
                        },
                        {
                            "columnRef": {
                                "index": 5
                            },
                            "index": 6,
                            "isId": false,
                            "name": "distributionStrategy"
                        },
                        {
                            "columnRef": {
                                "index": 6
                            },
                            "index": 7,
                            "isId": false,
                            "name": "platform"
                        },
                        {
                            "columnRef": {
                                "index": 7
                            },
                            "index": 8,
                            "isId": false,
                            "name": "platformConfig"
                        },
                        {
                            "index": 9,
                            "isId": false,
                            "name": "repositoryActors",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 10,
                            "isId": false,
                            "name": "repositoryApplications",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 11,
                            "isId": false,
                            "name": "repositoryTransactionHistory",
                            "relationRef": {
                                "index": 3
                            }
                        },
                        {
                            "columnRef": {
                                "index": 8
                            },
                            "index": 12,
                            "isId": false,
                            "name": "syncPriority"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 7
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "repository"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 9
                            },
                            "relationTableIndex": 12
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "repository"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 10
                            },
                            "relationTableIndex": 15
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "repository"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 11
                            },
                            "relationTableIndex": 5
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 11,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 7,
                                    "oneRelationIndex": 3,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ACTOR_ID",
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
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 12,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepositoryActor",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "actor",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 2,
                            "isId": true,
                            "name": "repository",
                            "relationRef": {
                                "index": 0
                            }
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
                                "index": 2
                            },
                            "relationTableIndex": 11
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 7
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_ACTORS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_SCHEMA_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SCHEMA_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 11,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
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
                            "index": 0
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 13,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepositorySchema",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "repository",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "schemaIndex"
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
                                "index": 1
                            },
                            "relationTableIndex": 11
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_SCHEMAS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 7,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ACTOR_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 8,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "APPLICATION_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
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
                    "index": 14,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "ActorApplication",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "actor",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "application",
                            "relationRef": {
                                "index": 1
                            }
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
                                "index": 1
                            },
                            "relationTableIndex": 7
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 8
                        }
                    ],
                    "tableConfig": {
                        "name": "ACTOR_APPLICATION"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 11,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 8,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "APPLICATION_ID",
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
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 15,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepositoryApplication",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "application",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 2,
                            "isId": true,
                            "name": "repository",
                            "relationRef": {
                                "index": 0
                            }
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
                                "index": 2
                            },
                            "relationTableIndex": 11
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "isRepositoryJoin": false,
                            "joinFunctionWithOperator": 0,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 8
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_APPLICATION"
                    }
                }
            ],
            "referencedSchemas": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map