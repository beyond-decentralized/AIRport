import { Injected } from "@airport/direction-indicator";
import { DbEntity } from "../../application/Entity";

export type Primitive = boolean | Date | number | string;

@Injected()
export class Dictionary {

	airbridge = {
		DOMAIN_NAME: 'airbridge' as 'airbridge'
	}

	airport = {
		DOMAIN_NAME: 'airport' as 'airport',
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
						name: 'AirEntity',
						columns: {
							ACTOR_LID: 'ACTOR_LID',
							ACTOR_RECORD_ID: 'ACTOR_RECORD_ID',
							REPOSITORY_LID: 'REPOSITORY_LID',
							SYSTEM_WIDE_OPERATION_LID: 'SYSTEM_WIDE_OPERATION_LID'
						},
						properties: {
							_actorRecordId: '_actorRecordId',
							_localId: '_localId',
							actor: 'actor',
							repository: 'repository',
							systemWideOperationId: 'systemWideOperationId'
						}
					}
				}
			},
			/*
			FLIGHT_RECORDER: {
				name: '@airport/flight-recorder',
				entities: {
					CopiedRecordLedger: {
						name: 'CopiedRecordLedger',
						columns: {
							COPY_ACTOR_LID: 'COPY_ACTOR_LID',
							COPY_REPOSITORY_LID: 'COPY_REPOSITORY_LID',
						}
					},
					CrossRepositoryRelationLedger: {
						name: 'CrossRepositoryRelationLedger',
						columns: {
							RELATION_LID: 'MANY_SIDE_APPLICATION_RELATION_LID',
							RELATED_REPOSITORY_LID: 'MANY_SIDE_REPOSITORY_LID',
						}
					}
				}
			},
			*/
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
							REPOSITORY_LID: 'REPOSITORY_LID'
						},
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
		DOMAIN_NAME: 'airway' as 'airway'
	}

    INTERNAL_APP = '@airport/terminal'
    INTERNAL_DOMAIN = 'internal://domain'

	Actor = this.airport.apps.HOLDING_PATTERN.entities.Actor
	AirEntity = this.airport.apps.FINAL_APPROACH.entities.AirEntity
	ApplicationRelation = this.airport.apps.AIRSPACE.entities.ApplicationRelation
	// CopiedRecordLedger = this.airport.apps.FLIGHT_RECORDER.entities.CopiedRecordLedger
	// CrossRepositoryRelationLedger = this.airport.apps.FLIGHT_RECORDER.entities.CrossRepositoryRelationLedger
	Repository = this.airport.apps.HOLDING_PATTERN.entities.Repository
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
		REFERENCED_COLUMN_NAME: 'referencedColumnName',
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

	private isEntityType(
		dbEntity: DbEntity,
		application: {
			name: string
		},
		entity: {
			name: string
		}
	): boolean {
		const dbApplication = dbEntity.applicationVersion.application

		return dbApplication.domain.name === this.airport.DOMAIN_NAME
			&& dbApplication.name === application.name
			&& dbEntity.name === entity.name
	}

}
