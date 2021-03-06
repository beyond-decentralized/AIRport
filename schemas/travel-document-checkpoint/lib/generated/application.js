/* eslint-disable */
export const APPLICATION = {
    "domain": "air",
    "index": null,
    "name": "@airport/travel-document-checkpoint",
    "sinceVersion": 1,
    "versions": [
        {
            "api": {
                "apiObjectMap": {
                    "UserAccountApi": {
                        "operationMap": {
                            "addUserAccount": {
                                "isAsync": true,
                                "parameters": []
                            },
                            "findUserAccount": {
                                "isAsync": true,
                                "parameters": []
                            }
                        }
                    }
                }
            },
            "entities": [
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "CONTINENT_ID",
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
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 0,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Continent",
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
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "countries",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "userAccounts",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "continent"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "continent"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 5,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "CONTINENTS",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "COUNTRY_ID",
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
                            "name": "ABBREVIATION",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 0,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
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
                    "isAirEntity": false,
                    "name": "Country",
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
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "abbreviation",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "userAccounts",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "country"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 5,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "COUNTRIES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "STATE_ID",
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
                            "name": "ABBREVIATION",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
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
                    "index": 2,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "State",
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
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "abbreviation",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "metroAreaStates",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "userAccounts",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "state"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "state"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 5,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "STATES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
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
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 4,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
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
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 3,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "MetroAreaState",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "state",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "metroArea",
                            "relationRef": {
                                "index": 1
                            },
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
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "METRO_AREA_STATES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "METRO_AREA_ID",
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
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
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
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
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
                    "index": 4,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "MetroArea",
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
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "metroAreaStates",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "userAccounts",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "metroArea"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 3,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "metroArea"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 5,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "METRO_AREAS",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "USER_ACCOUNT_LID",
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
                            "name": "EMAIL",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "PASSWORD_HASH",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "RANKING",
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
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "USER_ACCOUNTNAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 4
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "USER_ACCOUNT_GUID",
                            "notNull": true,
                            "propertyRefs": [
                                {
                                    "index": 5
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": 0,
                                    "oneTableIndex": 11,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "DOMAIN_LID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 6
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
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 0,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 7
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 8,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 1,
                                    "oneRelationIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 8
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 9,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 2,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 9
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "NUMBER"
                        },
                        {
                            "index": 10,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 4,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 4,
                                    "oneRelationIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 10
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
                    "index": 5,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "UserAccount",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "_localId",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "email",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "passwordHash",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 3
                            },
                            "index": 3,
                            "isId": false,
                            "name": "ranking",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 4
                            },
                            "index": 4,
                            "isId": false,
                            "name": "username",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 5
                            },
                            "index": 5,
                            "isId": false,
                            "name": "GUID",
                            "sinceVersion": 1
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "domain",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 8,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 9,
                            "isId": false,
                            "name": "state",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 10,
                            "isId": false,
                            "name": "metroArea",
                            "relationRef": {
                                "index": 4
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 11,
                            "relationTableApplication_Index": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 8
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 9
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 10
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
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
                            "name": "CLASSIFICATION_ID",
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
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 6,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Classification",
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
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "name",
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "CLASSIFICATIONS",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 6,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CLASSIFICATION_ID",
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
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 8,
                                    "oneRelationIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "TYPE_ID",
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
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 7,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "TypeClassification",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "classification",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "type",
                            "relationRef": {
                                "index": 1
                            },
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
                            "relationTableIndex": 6,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 8,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "TYPE_CLASSIFICATIONS",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "TYPE_ID",
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
                            "name": "NAME",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        }
                    ],
                    "idColumnRefs": [
                        {
                            "index": 0
                        }
                    ],
                    "index": 8,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Type",
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
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "name",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "typeClassifications",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "type"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 7,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "TYPES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 10,
                                    "oneRelationIndex": 4,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CLIENT_LID",
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
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 8,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "TYPE_ID",
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
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 9,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "ClientType",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "client",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "type",
                            "relationRef": {
                                "index": 1
                            },
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
                            "relationTableIndex": 10,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 8,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "CLIENT_TYPES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "CLIENT_LID",
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
                            "name": "CLIENT_DOMAIN",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "CLIENT_GUID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
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
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
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
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
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
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
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
                    "index": 10,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Client",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "_localId",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "domain",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "GUID",
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "state",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "metroArea",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "clientTypes",
                            "relationRef": {
                                "index": 4
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "client"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 9,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "CLIENTS",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 12,
                                    "oneRelationIndex": 4,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "DATABASE_LID",
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
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 8,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "TYPE_ID",
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
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 11,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "DatabaseType",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "database",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "type",
                            "relationRef": {
                                "index": 1
                            },
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
                            "relationTableIndex": 12,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 8,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "DATABASE_TYPE",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DATABASE_LID",
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
                            "name": "DATABASE_DOMAIN",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "DATABASE_GUID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 2
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
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
                            "index": 4,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
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
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
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
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
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
                    "index": 12,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Database",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "_localId",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "domain",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 2,
                            "isId": false,
                            "name": "GUID",
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "state",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "metroArea",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "databaseTypes",
                            "relationRef": {
                                "index": 4
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 3
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "database"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 11,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "DATABASES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 14,
                                    "oneRelationIndex": 5,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "TERMINAL_LID",
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
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 8,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "TYPE_ID",
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
                            "index": 0
                        },
                        {
                            "index": 1
                        }
                    ],
                    "index": 13,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "TerminalType",
                    "properties": [
                        {
                            "index": 0,
                            "isId": true,
                            "name": "terminal",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "name": "type",
                            "relationRef": {
                                "index": 1
                            },
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
                            "relationTableIndex": 14,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": true,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 1
                            },
                            "relationTableIndex": 8,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "TERMINAL_TYPES",
                        "columnIndexes": []
                    }
                },
                {
                    "columns": [
                        {
                            "index": 0,
                            "isGenerated": true,
                            "manyRelationColumnRefs": [],
                            "name": "TERMINAL_LID",
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
                            "name": "GUID",
                            "notNull": true,
                            "propertyRefs": [
                                {
                                    "index": 1
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "STRING"
                        },
                        {
                            "index": 2,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [],
                            "name": "IS_LOCAL",
                            "notNull": true,
                            "propertyRefs": [
                                {
                                    "index": 3
                                }
                            ],
                            "sinceVersion": 1,
                            "type": "BOOLEAN"
                        },
                        {
                            "index": 3,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 0,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 5,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "OWNER_USER_ACCOUNT_LID",
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
                                    "manyRelationIndex": 1,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 0,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "CONTINENT_ID",
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
                            "index": 5,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 2,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 1,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "COUNTRY_ID",
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
                            "index": 6,
                            "isGenerated": false,
                            "manyRelationColumnRefs": [
                                {
                                    "manyRelationIndex": 3,
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 2,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "STATE_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 6
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
                                    "oneApplication_Index": null,
                                    "oneTableIndex": 4,
                                    "oneColumnIndex": 0,
                                    "sinceVersion": 1
                                }
                            ],
                            "name": "METRO_AREA_ID",
                            "notNull": false,
                            "propertyRefs": [
                                {
                                    "index": 7
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
                    "index": 14,
                    "isLocal": true,
                    "isAirEntity": false,
                    "name": "Terminal",
                    "properties": [
                        {
                            "columnRef": {
                                "index": 0
                            },
                            "index": 0,
                            "isId": true,
                            "name": "_localId",
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 1
                            },
                            "index": 1,
                            "isId": false,
                            "name": "GUID",
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "name": "owner",
                            "relationRef": {
                                "index": 0
                            },
                            "sinceVersion": 1
                        },
                        {
                            "columnRef": {
                                "index": 2
                            },
                            "index": 3,
                            "isId": false,
                            "name": "isLocal",
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "name": "continent",
                            "relationRef": {
                                "index": 1
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "name": "country",
                            "relationRef": {
                                "index": 2
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 6,
                            "isId": false,
                            "name": "state",
                            "relationRef": {
                                "index": 3
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 7,
                            "isId": false,
                            "name": "metroArea",
                            "relationRef": {
                                "index": 4
                            },
                            "sinceVersion": 1
                        },
                        {
                            "index": 8,
                            "isId": false,
                            "name": "terminalTypes",
                            "relationRef": {
                                "index": 5
                            },
                            "sinceVersion": 1
                        }
                    ],
                    "relations": [
                        {
                            "index": 0,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 2
                            },
                            "relationTableIndex": 5,
                            "sinceVersion": 1
                        },
                        {
                            "index": 1,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 4
                            },
                            "relationTableIndex": 0,
                            "sinceVersion": 1
                        },
                        {
                            "index": 2,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 5
                            },
                            "relationTableIndex": 1,
                            "sinceVersion": 1
                        },
                        {
                            "index": 3,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 6
                            },
                            "relationTableIndex": 2,
                            "sinceVersion": 1
                        },
                        {
                            "index": 4,
                            "isId": false,
                            "relationType": "MANY_TO_ONE",
                            "propertyRef": {
                                "index": 7
                            },
                            "relationTableIndex": 4,
                            "sinceVersion": 1
                        },
                        {
                            "index": 5,
                            "isId": false,
                            "oneToManyElems": {
                                "mappedBy": "terminal"
                            },
                            "relationType": "ONE_TO_MANY",
                            "propertyRef": {
                                "index": 8
                            },
                            "relationTableIndex": 13,
                            "sinceVersion": 1
                        }
                    ],
                    "sinceVersion": 1,
                    "tableConfig": {
                        "name": "TERMINALS",
                        "propertyIndexes": [
                            {
                                "propertyIndex": 1,
                                "unique": true
                            }
                        ]
                    },
                    "operations": {}
                }
            ],
            "integerVersion": 1,
            "referencedApplications": [
                {
                    "domain": "air",
                    "index": 0,
                    "name": "@airport/airspace",
                    "sinceVersion": 1,
                    "versions": [
                        {
                            "entities": null,
                            "integerVersion": 1,
                            "referencedApplications": null,
                            "versionString": "1.0.0"
                        }
                    ]
                }
            ],
            "versionString": "1.0.0"
        }
    ]
};
//# sourceMappingURL=application.js.map