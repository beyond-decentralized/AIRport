import { Injected } from "@airport/direction-indicator";
import { DbEntity } from "../../application/DbEntity";
import { DbColumn, DbProperty } from "../../application/DbProperty";

export type Primitive = boolean | Date | number | string;

export type InternalDomainName = 'airbridge' | 'airport' | 'airway'

@Injected()
export class Dictionary {

	airbridge = {
		DOMAIN_NAME: 'airbridge' as InternalDomainName,
		apps: {
			KEYRING: {
				name: '@airbridge/keyring',
				entities: {
					KeyRing: {
						name: 'KeyRing'
					},
					RepositoryKey: {
						name: 'RepositoryKey'
					}
				}
			}
		}
	}

	airport = {
		DOMAIN_NAME: 'airport' as InternalDomainName,
		apps: {
			AIRPORT_CODE: {
				name: '@airport/airport-code',
				entities: {
					SystemWideOperationId: {
						name: 'SystemWideOperationId',
						columns: {
							SYSTEM_WIDE_OPERATION_LID: 'SYSTEM_WIDE_OPERATION_LID'
						},
						properties: {
							systemWideOperationId: 'systemWideOperationId'
						}
					}
				}
			},
			AIRSPACE: {
				name: '@airport/airspace',
				entities: {
					ApplicationRelation: {
						name: 'ApplicationRelation'
					}
				}
			},
			FINAL_APPROACH: {
				name: '@airport/final-approach',
				entities: {
					AirEntity: {
						name: 'AirEntity'
					},
					AirEntityFields: {
						name: 'AirEntityFields',
						columns: {
							SYSTEM_WIDE_OPERATION_LID: 'SYSTEM_WIDE_OPERATION_LID'
						},
						properties: {
							systemWideOperationId: 'systemWideOperationId'
						}
					},
					AirEntityId: {
						name: 'AirEntityId',
						columns: {
							ACTOR_LID: 'ACTOR_LID',
							ACTOR_RECORD_ID: 'ACTOR_RECORD_ID',
							REPOSITORY_LID: 'REPOSITORY_LID'
						},
						properties: {
							_actorRecordId: '_actorRecordId',
							actor: 'actor',
							repository: 'repository'
						}
					},
					InternalAirEntity: {
						name: 'InternalAirEntity'
					}
				}
			},
			HOLDING_PATTERN: {
				name: '@airport/holding-pattern',
				entities: {
					Actor: {
						name: 'Actor',
						columns: {
							ACTOR_LID: 'ACTOR_LID',
							USER_ACCOUNT_LID: 'USER_ACCOUNT_LID'
						},
						properties: {
							userAccount: 'userAccount'
						}
					},
					Repository: {
						name: 'Repository',
						columns: {
							REPOSITORY_LID: 'REPOSITORY_LID',
							GUID: 'GUID'
						},
						properties: {
							_localId: '_localId',
							GUID: 'GUID'
						}
					},
					RepositoryMember: {
						name: 'RepositoryMember'
					},
					RepositoryMemberAcceptance: {
						name: 'RepositoryMemberAcceptance'
					},
					RepositoryMemberInvitation: {
						name: 'RepositoryMemberInvitation'
					},
					RepositoryMemberUpdate: {
						name: 'RepositoryMemberUpdate'
					}
				}
			},
			LAYOVER: {
				name: '@airport/layover',
				entities: {
					CopiedEntityQuery: {
						name: 'CopiedEntityQuery',
						columns: {
							ID: 'ID'
						}
					}
				}
			},
			TRAVEL_DOCUMENT_CHECKPOINT: {
				name: '@airport/travel-document-checkpoint',
				entities: {
					Terminal: {
						name: 'Terminal',
						columns: {
							TERMINAL_LID: 'TERMINAL_LID'
						}
					},
					UserAccount: {
						name: 'UserAccount',
						columns: {
							USER_ACCOUNT_LID: 'USER_ACCOUNT_LID'
						},
						properties: {
							userAccount: 'userAccount'
						}
					}
				}
			}
		}
	}

	airway = {
		DOMAIN_NAME: 'airway' as InternalDomainName
	}

	INTERNAL_APP = '@airport/terminal'
	INTERNAL_DOMAIN = 'internal://domain'

	Actor = this.airport.apps.HOLDING_PATTERN.entities.Actor
	AirEntity = this.airport.apps.FINAL_APPROACH.entities.AirEntity
	AirEntityFields = this.airport.apps.FINAL_APPROACH.entities.AirEntityFields
	AirEntityId = this.airport.apps.FINAL_APPROACH.entities.AirEntityId
	ApplicationRelation = this.airport.apps.AIRSPACE.entities.ApplicationRelation
	// CopiedRecordLedger = this.airport.apps.HOLDING_PATTERN.entities.CopiedRecordLedger
	InternalAirEntity = this.airport.apps.FINAL_APPROACH.entities.InternalAirEntity
	KeyRing = this.airbridge.apps.KEYRING.entities.KeyRing
	Repository = this.airport.apps.HOLDING_PATTERN.entities.Repository
	RepositoryKey = this.airbridge.apps.KEYRING.entities.RepositoryKey
	SystemWideOperationId = this.airport.apps.AIRPORT_CODE.entities.SystemWideOperationId
	Terminal = this.airport.apps.TRAVEL_DOCUMENT_CHECKPOINT.entities.Terminal
	UserAccount = this.airport.apps.TRAVEL_DOCUMENT_CHECKPOINT.entities.UserAccount

	column = {
		/**
		 * Name property of the column.
		 * @type {string}
		 */
		NAME: 'name',

		/**
		 * Column data types.
		 */
		type: {
			ANY: 'any',
			BOOLEAN: 'boolean',
			DATE: 'Date',
			NUMBER: 'number',
			STRING: 'string',
		},
		_localId: '_localId'
	}

	/**
	 * Entity configuration keys.
	 */
	entity = {
		DATABASES: 'databases'
	}

	/**
	 * File level keys.
	 */
	file = {
		ENTITY: 'Entity',
		TABLE: 'Table'
	}

	/**
	 * Foreign Key configuration keys.
	 */
	foreignkey = {
		DEFINITION: 'foreignKeyDefinition',
		NAME: 'name',
		VALUE: 'value'
	}

	/**
	 * Index configuration keys.
	 */
	index = {
		COLUMN_LIST: 'columnList',
		NAME: 'name',
		UNIQUE: 'unique'
	}

	/**
	 * JoinColumn configuration keys.
	 */
	joincolumn = {
		FOREIGN_KEY: 'foreignKey',
		NULLABLE: 'nullable',
		REFERENCED_COLUMN_NAME: '',
		VALUE: 'value'
	}

	/**
	 * OneToMany configuration keys.
	 */
	onetomany = {
		MAPPED_BY: 'mappedBy'
	}

	/**
	 * Property annotation keys.
	 */
	property = {
		COLUMN: 'Column',
		ENUM_TYPE: 'Enum',
		ID: 'Id',
		JOIN_COLUMN: 'JoinColumn',
		JOIN_COLUMNS: 'JoinColumns',
		JSON_TYPE: 'Json',
		MANY_TO_ONE: 'ManyToOne',
		ONE_TO_MANY: 'OneToMany',
		// R_JOIN_COLUMN(s) are not needed since Repository relations are now
		// standardized - simple (@ManyToOne) and (@OneToMany) suffice.
		// R_JOIN_COLUMN   : 'RJoinColumn';
		// R_JOIN_COLUMNS  : 'RJoinColumns';
		SUB_QUERY: 'SubQuery',
		// WHERE_JOIN_TABLE: 'WhereJoinTable';
	}

	/**
	 * Table configuration keys.
	 */
	table = {
		INDEXES: 'indexes',
		NAME: 'name',
		PRIMARY_KEY: 'primaryKey',
		APPLICATION: 'application'
	}

	userAccount = {
		USER_ACCOUNT_LID: 'USER_ACCOUNT_LID'
	}

	terminal = {
		TERMINAL_LID: 'TERMINAL_LID'
	}

	isActor(
		dbEntity: DbEntity
	): boolean {
		return this.isEntityType(
			dbEntity,
			this.airport.apps.HOLDING_PATTERN,
			this.Actor
		)
	}

	isApplicationRelation(
		dbEntity: DbEntity
	): boolean {
		return this.isEntityType(
			dbEntity,
			this.airport.apps.AIRSPACE,
			this.ApplicationRelation
		)
	}

	isRepository(
		dbEntity: DbEntity
	): boolean {
		return this.isEntityType(
			dbEntity,
			this.airport.apps.HOLDING_PATTERN,
			this.Repository
		)
	}

	isRepositoryGUIDProperty(
		dbProperty: DbProperty
	): boolean {
		if (!this.isRepository(dbProperty.entity)) {
			return false
		}

		return dbProperty.name === this.Repository.properties.GUID
	}

	isRepositoryLIDColumn(
		dbProperty: DbProperty,
		dbColumn: DbColumn
	): boolean {
		if (!dbProperty.entity.isAirEntity) {
			if (!this.isRepository(dbProperty.entity)) {
				return false
			}

			return dbColumn.name === this.Repository.columns.REPOSITORY_LID
		}

		return this.isRepositoryRelationColumn(dbColumn)
	}

	isTerminal(
		dbEntity: DbEntity
	): boolean {
		return this.isEntityType(
			dbEntity,
			this.airport.apps.TRAVEL_DOCUMENT_CHECKPOINT,
			this.Terminal
		)
	}

	isUserAccount(
		dbEntity: DbEntity
	): boolean {
		return this.isEntityType(
			dbEntity,
			this.airport.apps.TRAVEL_DOCUMENT_CHECKPOINT,
			this.UserAccount
		)
	}

	isKeyringEntity(
		dbEntity: DbEntity
	): boolean {
		return this.isEntityType(
			dbEntity,
			this.airbridge.apps.KEYRING,
			this.KeyRing,
			this.airbridge.DOMAIN_NAME
		) || this.isEntityType(
			dbEntity,
			this.airbridge.apps.KEYRING,
			this.RepositoryKey,
			this.airbridge.DOMAIN_NAME
		)
	}

	isActorRelationColumn(
		dbColumn: DbColumn
	): boolean {
		return /.*_AID_[\d]+$/.test(dbColumn.name)
			&& !!dbColumn.manyRelationColumns.length
	}

	isRepositoryRelationColumn(
		dbColumn: DbColumn
	): boolean {
		return /.*_RID_[\d]+$/.test(dbColumn.name)
			&& !!dbColumn.manyRelationColumns.length
	}

	isActorProperty(
		dbProperty: DbProperty
	) {
		return dbProperty.entity.isAirEntity
			&& this.AirEntityId.properties.actor === dbProperty.name
	}

	isRepositoryProperty(
		dbProperty: DbProperty
	) {
		return dbProperty.entity.isAirEntity
			&& this.AirEntityId.properties.repository === dbProperty.name
	}

	private isEntityType(
		dbEntity: DbEntity,
		application: {
			name: string
		},
		entity: {
			name: string
		},
		expectedDomainName = this.airport.DOMAIN_NAME
	): boolean {
		const dbApplication = dbEntity.applicationVersion.application

		return dbApplication.domain.name === expectedDomainName
			&& dbApplication.name === application.name
			&& dbEntity.name === entity.name
	}

}
