"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = {
    "domain": "public",
    "index": null,
    "name": "@airport/guideway",
    "versions": [
        {
            "entities": [
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
                            "name": "AGT_SHARING_MESSAGE_ID",
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
                                    "oneTableIndex": 1,
                                    "oneRelationIndex": 4,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "AGT_REPO_TRANS_BLOCK_ID",
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
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SyncLog",
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
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_SYNC_LOG"
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
                            "name": "ARCHIVING_STATUS",
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
                            "name": "ADD_DATETIME",
                            "propertyRefs": [
                                {
                                    "index": 6
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "TM_REPOSITORY_TRANSACTION_BLOCK_ID",
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
                            "name": "REPOSITORY_TRANSACTION_BLOCK",
                            "propertyRefs": [
                                {
                                    "index": 8
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 5,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 17,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                },
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
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 15,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "TERMINAL_ID",
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
                                    "oneTableIndex": 12,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ARCHIVING_SERVER_ID",
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
                    "index": 1,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "AgtRepositoryTransactionBlock",
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
                            "name": "terminalRepositories",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "terminal",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "archivingServer",
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
                            "name": "archivingStatus"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 6,
                            "isId": false,
                            "name": "addDatetime"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 7,
                            "isId": false,
                            "name": "tmRepositoryTransactionBlockId"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 8,
                            "isId": false,
                            "name": "contents"
                        },
                        {
                            "index": 9,
                            "isId": false,
                            "name": "syncLogs",
                            "relationRef": {
                                "index": 4
                            }
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
                            "relationTableIndex": 17
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 16
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 15
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 12
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 9
                            },
                            "relationTableIndex": 0
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_REPOSITORY_TRANSACTION_BLOCKS"
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
                            "type": 5
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "LOCATION",
                            "propertyRefs": [
                                {
                                    "index": 1
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
                    "index": 2,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Archive",
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
                            "name": "location"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "ARCHIVES"
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
                            "type": 4
                        },
                        {
                            "index": 1,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 18,
                                    "oneColumnIndex": 2
                                }
                            ],
                            "name": "REPOSITORY_ID",
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
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 18,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "DATE_NUMBER",
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
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 15,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "TERMINAL_ID",
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
                        },
                        {
                            "index": 3
                        }
                    ],
                    "index": 3,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "DailyTerminalSyncLog",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "dailyArchiveLog",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "terminal",
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
                            "relationTableIndex": 18
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 15
                        }
                    ],
                    "tableConfig": {
                        "name": "DAILY_TERMINAL_SYNC_LOG"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "MONTH_NUMBER",
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
                            "name": "NUMBER_OF_CHANGES",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "columnDefinition": "BOOL[]",
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DAYS_WITH_CHANGES",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 0
                        },
                        {
                            "index": 3,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 17,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
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
                            "index": 3
                        }
                    ],
                    "index": 4,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "MonthlyArchiveLog",
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
                            "columnRef": {
                                "index": 0
                            },
                            "index": 1,
                            "isId": true,
                            "name": "monthNumber"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "numberOfChanges"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 3,
                            "isId": false,
                            "name": "daysWithChanges"
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
                            "relationTableIndex": 17
                        }
                    ],
                    "tableConfig": {
                        "name": "MONTHLY_ARCHIVE_LOG"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ALL_ACKNOWLEDGED",
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "type": 1
                        },
                        {
                            "columnDefinition": "BOOL[]",
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DAILY_SYNC_STATUSES",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 2,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 3
                                }
                            ],
                            "name": "REPOSITORY_ID",
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
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "MONTH_NUMBER",
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
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 15,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "TERMINAL_ID",
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
                            "index": 2
                        },
                        {
                            "index": 3
                        },
                        {
                            "index": 4
                        }
                    ],
                    "index": 5,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "MonthlyTerminalSyncLog",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "monthlyArchiveLog",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "terminal",
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
                            "name": "allAcknowledged"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 3,
                            "isId": false,
                            "name": "dailySyncStatuses"
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
                            "relationTableIndex": 4
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 15
                        }
                    ],
                    "tableConfig": {
                        "name": "MONTHLY_TERMINAL_SYNC_LOG"
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
                                    "oneTableIndex": 17,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
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
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "ARCHIVE_ID",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 5
                        }
                    ],
                    "idColumnRefs": [],
                    "index": 6,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "RepositoryArchive",
                    "properties": [
                        {
                            "index": 0,
                            "isId": false,
                            "name": "repository",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "name": "archive",
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
                            "relationTableIndex": 17
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 2
                        }
                    ],
                    "tableConfig": {
                        "name": "REPOSITORY_ARCHIVE"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PERMISSION",
                            "propertyRefs": [
                                {
                                    "index": 2
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
                                    "oneTableIndex": 17,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
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
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 8,
                                    "oneRelationIndex": 1,
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
                    "name": "UserRepository",
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
                            "name": "user",
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
                            "name": "permission"
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
                            "relationTableIndex": 17
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 8
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_USER_REPOSITORIES"
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
                            "name": "EMAIL",
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
                            "name": "IS_INVITATION",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 1
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
                            "name": "hash"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "email"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "isInvitation"
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "securityAnswers",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "userRepositories",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "terminals",
                            "relationRef": {
                                "index": 2
                            }
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "repositoryTransactionBlocks",
                            "relationRef": {
                                "index": 3
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 10
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 7
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 15
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_USERS"
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
                            "name": "QUESTION",
                            "propertyRefs": [
                                {
                                    "index": 1
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
                    "index": 9,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SecurityQuestion",
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
                            "name": "question"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "AGT_SECURITY_QUESTIONS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "ANSWER",
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
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 8,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "USER_ID",
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
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 9,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SECURITY_QUESTION_ID",
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
                    "index": 10,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "SecurityAnswer",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "user",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "securityQuestion",
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
                            "name": "answer"
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
                            "relationTableIndex": 8
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 9
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_SECURITY_ANSWERS"
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
                                    "index": 2
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "START_DATETIME",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 2
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PROCESSED_DATETIME",
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "type": 2
                        },
                        {
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NUMBER_OF_CONNECTIONS",
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NUMBER_OF_SYNC_RECORDS",
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
                            "name": "DATA_CHARS_TOTAL",
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "type": 4
                        },
                        {
                            "index": 7,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 12,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SERVER_ID",
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
                    "name": "ServerSyncLog",
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
                            "name": "server",
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
                            "name": "type"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 3,
                            "isId": false,
                            "name": "startDatetime"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 4,
                            "isId": false,
                            "name": "endDatetime"
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 5,
                            "isId": false,
                            "name": "numberOfConnections"
                        },
                        {
                            "columnRef": {
                                "index": 5
                            },
                            "index": 6,
                            "isId": false,
                            "name": "numberOfRecords"
                        },
                        {
                            "columnRef": {
                                "index": 6
                            },
                            "index": 7,
                            "isId": false,
                            "name": "dataCharsTotal"
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
                            "relationTableIndex": 12
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_SERVER_SYNC_LOG"
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
                            "name": "SERVERTYPE",
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
                    "index": 12,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Server",
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
                            "name": "serverType"
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "serverSyncLogs",
                            "relationRef": {
                                "index": 0
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 11
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_SERVERS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "SERVER_TYPE",
                            "propertyRefs": [
                                {
                                    "index": 0
                                }
                            ],
                            "type": 5
                        },
                        {
                            "index": 1,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PARAMETER_GROUP",
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
                            "name": "PARAMETER_NAME",
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
                            "name": "PARAMETER_VALUE",
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "type": 5
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        },
                        {
                            "index": 1
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 13,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "TuningParameters",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "serverType"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": true,
                            "name": "parameterGroup"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": true,
                            "name": "parameterName"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "parameterValue"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "AGT_TUNING_PARAMETERS"
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
                            "name": "TM_SHARING_MESSAGE_ID",
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
                            "name": "ACKNOWLEDGED",
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
                                    "oneTableIndex": 15,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "SYNCED_TERMINAL_ID",
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
                    "index": 14,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "AgtSharingMessage",
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
                            "name": "terminal",
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
                            "name": "tmSharingMessageId"
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "syncLogs",
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
                            "name": "acknowledged"
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
                            "relationTableIndex": 15
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 0
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_SHARING_MESSAGES"
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
                            "name": "PASSWORD",
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
                            "name": "LAST_RECENT_CONNECTION_DATETIME",
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
                            "name": "LAST_ARCHIVE_CONNECTION_DATETIME",
                            "propertyRefs": [
                                {
                                    "index": 3
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
                                    "oneTableIndex": 8,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "USER_ID",
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
                    "index": 15,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Terminal",
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
                            "name": "password"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "lastPollConnectionDatetime"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "lastSseConnectionDatetime"
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "user",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "terminalRepositories",
                            "relationRef": {
                                "index": 1
                            }
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "sharingMessages",
                            "relationRef": {
                                "index": 2
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 8
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 16
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 14
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_TERMINALS"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PERMISSION",
                            "propertyRefs": [
                                {
                                    "index": 2
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
                                    "oneTableIndex": 15,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "TERMINAL_ID",
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
                                    "oneSchemaIndex": null,
                                    "oneTableIndex": 17,
                                    "oneRelationIndex": 0,
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
                            "index": 1
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 16,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "TerminalRepository",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "terminal",
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
                            "name": "permission"
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
                            "relationTableIndex": 15
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": 1,
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 17
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_TERMINAL_REPOSITORIES"
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
                            "name": "LAST_UPDATE_DATETIME",
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "type": 2
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
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
                            "name": "STATUS",
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
                    "index": 17,
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
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "lastUpdateTime"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "name"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "status"
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "terminalRepositories",
                            "relationRef": {
                                "index": 0
                            }
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "repositoryTransactionBlocks",
                            "relationRef": {
                                "index": 1
                            }
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 16
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": 0,
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 1
                        }
                    ],
                    "tableConfig": {
                        "name": "AGT_REPOSITORIES"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DATE_NUMBER",
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
                            "name": "NUMBER_OF_CHANGES",
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
                                    "oneTableIndex": 17,
                                    "oneColumnIndex": 0
                                }
                            ],
                            "name": "REPOSITORY_ID",
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
                    "index": 18,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "DailyArchiveLog",
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
                            "columnRef": {
                                "index": 0
                            },
                            "index": 1,
                            "isId": true,
                            "name": "dateNumber"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 2,
                            "isId": false,
                            "name": "numberOfChanges"
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
                            "relationTableIndex": 17
                        }
                    ],
                    "tableConfig": {
                        "name": "DAILY_ARCHIVE_LOG"
                    }
                }
            ],
            "referencedSchemas": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map