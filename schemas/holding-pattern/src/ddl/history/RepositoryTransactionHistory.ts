import { RepositoryMemberInvitation_PrivateSigningKey, IRepositoryTransactionHistory, RepositoryTransactionHistory_IsRepositoryCreation, RepositoryTransactionHistory_LocalId, RepositoryTransactionHistory_SaveTimestamp, RepositoryTransactionType } from '@airport/ground-control'
import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
} from '@airport/tarmaq-entity'
import { RepositoryMember } from '../repository/member/RepositoryMember'
import { Repository } from '../repository/Repository'
import { OperationHistory } from './OperationHistory'
import { TransactionHistory } from './TransactionHistory'
import { RepositoryMemberUpdate } from '../repository/member/RepositoryMemberUpdate'
import { RepositoryMemberInvitation } from '../repository/member/RepositoryMemberInvitation'
import { RepositoryMemberAcceptance } from '../repository/member/RepositoryMemberAcceptance'
import { RepositoryBlock } from '../blockchain/RepositoryBlock'

/**
 * Created by Papa on 9/15/2016.
 */

/**
 * An entry in the repository Transaction History/Log.
 * The main synchronization unit exchanged between terminals.
 */
@Entity()
@Table({ name: 'REPOSITORY_TRANSACTION_HISTORY' })
export class RepositoryTransactionHistory
	implements IRepositoryTransactionHistory {

	@GeneratedValue()
	@Id()
	@SequenceGenerator({ allocationSize: 200 })
	@Column({ name: 'REPOSITORY_TRANSACTION_HISTORY_LID', nullable: false })
	@DbNumber()
	_localId: RepositoryTransactionHistory_LocalId

	@Column({ name: 'REPOSITORY_TRANSACTION_TYPE', nullable: false })
	@DbString()
	repositoryTransactionType: RepositoryTransactionType = RepositoryTransactionType.LOCAL

	@Column({ name: 'SAVE_TIMESTAMP', nullable: false })
	@DbNumber()
	saveTimestamp: RepositoryTransactionHistory_SaveTimestamp

	@Column({ name: "IS_REPOSITORY_CREATION", nullable: false })
	@DbBoolean()
	isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation
    
	// Present only for Repository invitation acceptances and only
	// in the database of the Terminal where the invitation is accepted
	@Column({ name: "INVITATION_PRIVATE_SIGNING_KEY" })
	@DbString()
	invitationPrivateSigningKey?: RepositoryMemberInvitation_PrivateSigningKey

	@ManyToOne()
	@JoinColumn({ name: 'REPOSITORY_BLOCK_LID', nullable: false })
    block?: RepositoryBlock

	@ManyToOne()
	@JoinColumn({ name: 'REPOSITORY_MEMBER_LID', nullable: false })
	member: RepositoryMember
	
	@ManyToOne()
	@JoinColumn({
		name: 'PREVIOUS_REPOSITORY_TRANSACTION_HISTORY_LID',
		referencedColumnName: 'REPOSITORY_TRANSACTION_HISTORY_LID'
	})
	previousRepositoryTransactionHistory?: RepositoryTransactionHistory

	@ManyToOne()
	@JoinColumn({ name: 'REPOSITORY_LID', nullable: false })
	repository: Repository

	@ManyToOne()
	@JoinColumn({ name: 'TRANSACTION_HISTORY_LID', nullable: false })
	transactionHistory: TransactionHistory

	@OneToMany({ mappedBy: 'previousRepositoryTransactionHistory' })
	followingRepositoryTransactionHistories?: RepositoryTransactionHistory[] = []

	@OneToMany({ mappedBy: 'repositoryTransactionHistory' })
	operationHistory: OperationHistory[] = []

	// Tracked only in the Terminal database where originally added, for the
	// purpose of sending out synchronization messages
	// IS resent in IRepositoryBlock
	@OneToMany({ mappedBy: 'addedInRepositoryTransactionHistory' })
	newRepositoryMemberInvitations?: RepositoryMemberInvitation[] = []

	// Tracked only in the Terminal database where originally added, for the
	// purpose of sending out synchronization messages
	// IS resent in IRepositoryBlock
	@OneToMany({ mappedBy: 'addedInRepositoryTransactionHistory' })
	newRepositoryMemberAcceptances?: RepositoryMemberAcceptance[] = []

	// Tracked only in the Terminal database where originally added, for the
	// purpose of sending out synchronization messages
	// IS NOT implemented (currently)
	@OneToMany({ mappedBy: 'addedInRepositoryTransactionHistory' })
	newRepositoryMemberUpdates?: RepositoryMemberUpdate[] = []

	// Tracked only in the Terminal database where originally added, for the
	// purpose of sending out synchronization messages
	// IS NOT resent in IRepositoryBlock
	@OneToMany({ mappedBy: 'addedInRepositoryTransactionHistory' })
	newRepositoryMembers?: RepositoryMember[] = []

	constructor(
		data?: RepositoryTransactionHistory
	) {
		if (!data) {
			return
		}

		this._localId = data._localId
		this.transactionHistory = data.transactionHistory
		this.repository = data.repository
		this.saveTimestamp = data.saveTimestamp
		this.operationHistory = data.operationHistory
	}

}
