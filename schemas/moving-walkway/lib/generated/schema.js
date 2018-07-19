"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = {
    "domain": "public",
    "index": null,
    "name": "@airport/moving-walkway",
    "versions": [
        {
            "entities": [
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ACTOR_RECORD_ID",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "UPDATED_VALUE",
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "type": 0
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SCHEMA_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 5
                                },
                                {
                                    "manyRelationIndex": 3,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 2
                                }
                            ],
                            "name": "SCHEMA_VERSION_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                },
                                {
                                    "index": 5
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
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 0
                                },
                                {
                                    "manyRelationIndex": 3,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 1
                                }
                            ],
                            "name": "TABLE_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 1
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
                                    "oneSchemaIndex": 1,
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
                        },
                        {
                            "index": 6,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "COLUMN_INDEX",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 7,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 4,
                                    "oneSchemaIndex": 1,
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
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        },
                        {
                            "index": 2
                        },
                        {
                            "index": 3
                        },
                        {
                            "index": 4
                        },
                        {
                            "index": 5
                        },
                        {
                            "index": 6
                        }
                    ],
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RecordUpdateStage",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "schema",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "entity",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 4
                            }
                        },
                        {
                            "index": 3,
                            "isId": true,
                            "name": "actor",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 4,
                            "isId": true,
                            "name": "actorRecordId"
                        },
                        {
                            "index": 5,
                            "isId": true,
                            "name": "column",
                            "relationRef": {
                                "index": 3
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 6,
                            "isId": false,
                            "name": "updatedValue"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 3,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 2,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 7,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 3,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 2,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 11,
                            "relationTableSchemaIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "RECORD_UPDATE_STAGE"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "COLUMNINDEX",
                            "propertyRefs": [
                                {
                                    "index": 1
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
                                    "oneTableIndex": 2,
                                    "oneRelationIndex": 3,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SYNCHRONIZATION_CONFLICT_ID",
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
                            "index": 1
                        }
                    ],
                    "index": 1,
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
                            }
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 1,
                            "isId": true,
                            "name": "columnIndex"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 2
                        }
                    ],
                    "tableConfig": {
                        "name": "SYNCHRONIZATION_CONFLICT_VALUES"
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
                            "name": "TYPE",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": 1,
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
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "OVERWRITTEN_RECORD_HISTORY_ID",
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
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "OVERWRITING_RECORD_HISTORY_ID",
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
                    "index": 2,
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
                            "name": "id"
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "overwrittenRecordHistory",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "overwritingRecordHistory",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "values",
                            "relationRef": {
                                "index": 3
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 5,
                            "isId": false,
                            "name": "type"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 11,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "oneToManyElems": {
                                "cascade": 1,
                                "mappedBy": "SYNCHRONIZATION_CONFLICT_ID"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "SYNCHRONIZATION_CONFLICT"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ACKNOWLEDGED",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 1
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SYNC_CONFLICT_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 1,
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
                    "index": 3,
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
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "actor",
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
                            "name": "acknowledged"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 2
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 7,
                            "relationTableSchemaIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "SYNC_CONFLICT_PENDING_NOTIFICATION"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
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
                                    "index": 5
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "STATUS",
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SCHEMA_INDEX",
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
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 5
                                }
                            ],
                            "name": "SCHEMA_VERSION_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 5,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 3,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ENTITY_INDEX",
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
                                    "manyRelationIndex": 2,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 11,
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
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 7,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ACTOR_ID",
                            "propertyRefs": [
                                {
                                    "index": 4
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
                    "name": "MissingRecord",
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
                            "name": "schema",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "entity",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "actor",
                            "relationRef": {
                                "index": 3
                            }
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 5,
                            "isId": false,
                            "name": "actorRecordId"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 6,
                            "isId": false,
                            "name": "status"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 3,
                            "relationTableSchemaIndex": 0
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 11,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 7,
                            "relationTableSchemaIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "MISSING_RECORDS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "MISSING_RECORD_ID",
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
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 16,
                                    "oneRelationIndex": 5,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_TRANSACTION_BLOCK_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 4
                        }
                    ],
                    "idColumnRefs": [],
                    "index": 5,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "MissingRecordRepoTransBlock",
                    "properties": [
                        {
                            "index": 0,
                            "isId": false,
                            "name": "missingRecord",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "repositoryTransactionBlock",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 4
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 16
                        }
                    ],
                    "tableConfig": {
                        "name": "MISSING_RECORD_REPO_TRANS_BLOCKS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
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
                            "name": "SYNC_OUTCOME_TYPE",
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
                    "name": "RepoTransBlockResponseStage",
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
                            "name": "syncOutcomeType"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "REPO_TRANS_BLOCK_RESPONSE_STAGE"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "STATUS",
                            "propertyRefs": [
                                {
                                    "index": 1
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
                                    "oneTableIndex": 16,
                                    "oneRelationIndex": 6,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SHARING_MESSAGE_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 0,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SCHEMA_INDEX",
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
                            "index": 1
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 7,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepoTransBlockSchemasToChange",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "repositoryTransactionBlock",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 1,
                            "isId": false,
                            "name": "status"
                        },
                        {
                            "index": 2,
                            "isId": true,
                            "name": "schema",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 16
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 1,
                            "relationTableSchemaIndex": 0
                        }
                    ],
                    "tableConfig": {
                        "name": "REPO_TRANS_BLOCK_SCHEMAS_TO_CHANGE"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_TRANSACTION_HISTORY_ID",
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
                            "name": "BLOCK_ID",
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
                    "index": 8,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepositoryTransactionHistoryUpdateStage",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "repositoryTransactionHistoryId"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "blockId"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "REPOSITORY_TRANSACTION_HISTORY_UPDATE_STAGE"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SYNC_TIMESTAMP",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 2
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SYNC_OUTCOME_TYPE",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ORIGIN",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "BLOCK_SYNC_STATUS",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 10,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SHARING_NODE_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 5,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 16,
                                    "oneRelationIndex": 3,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_TRANSACTION_BLOCK_ID",
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
                            "index": 4
                        },
                        {
                            "index": 5
                        }
                    ],
                    "index": 9,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SharingNodeRepoTransBlock",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "sharingNode",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "repositoryTransactionBlock",
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
                            "name": "syncTimestamp"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 3,
                            "isId": false,
                            "name": "syncOutcomeType"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 4,
                            "isId": false,
                            "name": "origin"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 5,
                            "isId": false,
                            "name": "blockSyncStatus"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 10
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 16
                        }
                    ],
                    "tableConfig": {
                        "name": "SHARING_NODE_REPO_TRANS_BLOCKS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
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
                            "name": "SHARING_MECHANISM",
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
                            "name": "IS_ACTIVE",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 1
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SYNC_FREQUENCY",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "CONNECTION_PROTOCOL",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "CONNECTION_URL",
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
                    "name": "SharingNode",
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
                            "name": "sharingMechanism"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "isActive"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "syncFrequency"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 4,
                            "isId": false,
                            "name": "connectionProtocol"
                        },
                        {
                            "columnRef": {
                                "index": 5
                            },
                            "index": 5,
                            "isId": false,
                            "name": "connectionUrl"
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "messages",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "sharingNodeRepoTransBlocks",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "sharingNode"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 14
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "sharingNode"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 9
                        }
                    ],
                    "tableConfig": {
                        "name": "SHARING_NODES"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "AGT_DATABASE_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "AGT_DATABASE_HASH",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DATABASE_SYNC_STATUS",
                            "propertyRefs": [
                                {
                                    "index": 4
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
                                    "oneTableIndex": 10,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SHARING_NODE_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 9,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "DATABASE_ID",
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
                            "index": 3
                        },
                        {
                            "index": 4
                        }
                    ],
                    "index": 11,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SharingNodeDatabase",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "sharingNode",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "database",
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
                            "name": "agtDatabaseId"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 3,
                            "isId": false,
                            "name": "agtDatabaseHash"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 4,
                            "isId": false,
                            "name": "databaseSyncStatus"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 10
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 9,
                            "relationTableSchemaIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "SHARING_NODE_DATABASE"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SHARING_NODE_ID",
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
                            "name": "REPOSITORY_TRANSACTION_BLOCK_ID",
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
                            "name": "SYNC_OUTCOME_TYPE",
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
                    "index": 12,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SharingNodeRepoTransBlockStage",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "sharingNodeId"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": true,
                            "name": "repositoryTransactionBlockId"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "syncOutcomeType"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "SHARING_NODE_REPO_TRANS_BLOCK_STAGE"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "AGT_REPOSITORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ADVISED_SYNC_PRIORITY",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "REPOSITORY_SYNC_STATUS",
                            "propertyRefs": [
                                {
                                    "index": 4
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
                                    "oneTableIndex": 10,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SHARING_NODE_ID",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 1,
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
                            "index": 3
                        },
                        {
                            "index": 4
                        }
                    ],
                    "index": 13,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SharingNodeRepository",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "sharingNode",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "repository",
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
                            "name": "agtRepositoryId"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 3,
                            "isId": false,
                            "name": "advisedSyncPriority"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 4,
                            "isId": false,
                            "name": "repositorySyncStatus"
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 10
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 11,
                            "relationTableSchemaIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "SHARING_NODE_REPOSITORIES",
                        "primaryKey": [
                            "SHARING_NODE_ID",
                            "REPOSITORY_ID"
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
                            "name": "ORIGIN",
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
                            "name": "AGT_DATABASE_SYNC_LOG_ID",
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
                            "name": "SYNC_TIMESTAMP",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 2
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 10,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SHARING_NODE_ID",
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
                            "index": 4
                        }
                    ],
                    "index": 14,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SharingMessage",
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
                            "name": "sharingNode",
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
                            "name": "origin"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 3,
                            "isId": false,
                            "name": "agtDatabaseSyncLogId"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 4,
                            "isId": false,
                            "name": "syncTimestamp"
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "sharingMessageRepoTransBlocks",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 10
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "sharingMessage"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 15
                        }
                    ],
                    "tableConfig": {
                        "name": "SHARING_MESSAGES"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 14,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SHARING_MESSAGE_ID",
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
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 16,
                                    "oneRelationIndex": 4,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_TRANSACTION_BLOCK_ID",
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
                    "name": "SharingMessageRepoTransBlock",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "sharingMessage",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "repositoryTransactionBlock",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 0
                            },
                            "relationTableIndex": 14
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 16
                        }
                    ],
                    "tableConfig": {
                        "name": "SHARING_MESSAGE_REPO_TRANS_BLOCKS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
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
                            "name": "HASH",
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
                            "name": "SYNC_OUTCOME_TYPE",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "CONTENTS",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 4,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 9,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SOURCE_DATABASE_ID",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 5,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneSchemaIndex": 1,
                                    "oneTableIndex": 11,
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
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 16,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepositoryTransactionBlock",
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
                            "name": "hash"
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "source",
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
                            "columnRef": {
                                "index": 2
                            },
                            "index": 4,
                            "isId": false,
                            "name": "syncOutcomeType"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 5,
                            "isId": false,
                            "name": "contents"
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "repositoryTransactionHistory",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "sharingNodeRepoTransBlocks",
                            "relationRef": {
                                "index": 3
                            }
                        },
                        {
                            "index": 8,
                            "isId": false,
                            "name": "sharingMessageRepoTransBlocks",
                            "relationRef": {
                                "index": 4
                            }
                        },
                        {
                            "index": 9,
                            "isId": false,
                            "name": "missingRecordRepoTransBlocks",
                            "relationRef": {
                                "index": 5
                            }
                        },
                        {
                            "index": 10,
                            "isId": false,
                            "name": "repoTransBlockSchemasToChange",
                            "relationRef": {
                                "index": 6
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 9,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 11,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 5,
                            "relationTableSchemaIndex": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "repositoryTransactionBlock"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 9
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "repositoryTransactionBlock"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 8
                            },
                            "relationTableIndex": 15
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "repositoryTransactionBlock"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 9
                            },
                            "relationTableIndex": 5
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "repositoryTransactionBlock"
                            },
                            "relationType": 0,
                            "propertyRef": {
                                "index": 10
                            },
                            "relationTableIndex": 7
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_TRANSACTION_BLOCKS"
                    }
                }
            ],
            "referencedSchemas": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map