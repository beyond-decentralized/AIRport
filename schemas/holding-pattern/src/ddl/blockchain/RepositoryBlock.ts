import { IRepositoryBlock, IRepositoryBlockData, RepositoryBlock_GUID, RepositoryBlock_HashSum, RepositoryBlock_LocalId, RepositoryBlock_PackagedData, RepositoryBlock_SyncTimestamp, RepositoryMemberAcceptance_Signature, RepositoryMember_Signature, UserAccount_Signature } from "@airport/ground-control";
import { Column, DbAny, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, SequenceGenerator, Table, Transient } from "@airport/tarmaq-entity";
import { Repository } from "../repository/Repository";
import { RepositoryTransactionHistory } from "../ddl";
import { Terminal } from "@airport/travel-document-checkpoint";

/**
 * Created by Papa on 5/20/2024.
 */

/**
 * An entry in the repository blockchain.
 */
@Entity()
@Table({ name: 'REPOSITORY_TRANSACTION_HISTORY' })
export class RepositoryBlock
    implements IRepositoryBlock {

        @GeneratedValue()
        @Id()
        @SequenceGenerator({ allocationSize: 200 })
        @Column({ name: 'REPOSITORY_BLOCK_LID', nullable: false })
        @DbNumber()
        _localId?: RepositoryBlock_LocalId

        @Column({ name: "GUID", nullable: false })
        @DbString()
        GUID: RepositoryBlock_GUID

        @Column({ name: "HASH_SUM", nullable: false })
        @DbString()
        hashSum?: RepositoryBlock_HashSum

        @Column({ name: "PACKAGED_DATA", nullable: false })
        @DbAny()
        packagedData?: RepositoryBlock_PackagedData

	    @Column({ name: 'SYNC_TIMESTAMP', nullable: false })
	    @DbNumber()
        syncTimestamp?: RepositoryBlock_SyncTimestamp

        // Signed with RepositoryMemberInvitation_PublicSigningKey
        @Column({ name: "ACCEPTANCE_SIGNATURE" })
        @DbString()
        acceptanceSignature?: RepositoryMemberAcceptance_Signature
    
        // All messages without membership acceptance are signed
        // with a memberSignature
        @Column({ name: "MEMBER_SIGNATURE" })
        @DbString()
        memberSignature?: RepositoryMember_Signature
    
        // Repository Creation and messages with RepositoryMemberAcceptance
        // are signed with userAccountSignature
        @Column({ name: "USER_ACCOUNT_SIGNATURE" })
        @DbString()
        userAccountSignature?: UserAccount_Signature
   
	    @OneToMany({ mappedBy: "block"})
        history?: RepositoryTransactionHistory[]

	    @ManyToOne()
	    @JoinColumn({
		    name: 'PREVIOUS_BLOCK_LID',
		    referencedColumnName: 'REPOSITORY_BLOCK_LID',
            nullable: false
	    })
        previousBlock?: RepositoryBlock

	    @ManyToOne()
	    @JoinColumn({
		    name: 'PREVIOUS_TRUNK_BLOCK_LID',
		    referencedColumnName: 'REPOSITORY_BLOCK_LID',
            nullable: false
	    })
        previousTrunkBlock?: RepositoryBlock

	    @ManyToOne()
	    @JoinColumn({ name: 'REPOSITORY_LID', nullable: false })
        repository?: Repository

	    @ManyToOne()
	    @JoinColumn({ name: 'TERMINAL_LID', nullable: false })
        terminal?: Terminal

        // OneToManys

	    @OneToMany({ mappedBy: 'previousBlock' })
        nextBlocks?: RepositoryBlock[]
    
        // Transient

        @Transient()
        data?: IRepositoryBlockData
    
    }