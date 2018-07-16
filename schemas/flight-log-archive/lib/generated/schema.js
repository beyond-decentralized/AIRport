"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA = {
    "domain": "public",
    "index": null,
    "name": "@airport/flight-log-archive",
    "versions": [
        {
            "entities": [
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DATABASE_ID",
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
                            "name": "DATE_NUMBER",
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
                            "index": 1
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 0,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "DailySyncLog",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "databaseId"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": true,
                            "name": "date"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": true,
                            "name": "repositoryId"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "DAILY_SYNC_LOG"
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DATABASE_ID",
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
                            "name": "DATE",
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
                            "name": "REPOSITORY_ID",
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
                            "name": "SYNCED",
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
                        },
                        {
                            "index": 1
                        },
                        {
                            "index": 2
                        }
                    ],
                    "index": 1,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "MonthlySyncLog",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "databaseId"
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": true,
                            "name": "month"
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": true,
                            "name": "repositoryId"
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "synced"
                        }
                    ],
                    "relations": [],
                    "tableConfig": {
                        "name": "MONTHLY_SYNC_LOG"
                    }
                },
                {
                    "columns": [],
                    "idColumnRefs": [],
                    "index": 2,
                    "isLocal": true,
                    "isRepositoryEntity": false,
                    "name": "Log",
                    "properties": [],
                    "relations": []
                }
            ],
            "referencedSchemas": [],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=schema.js.map