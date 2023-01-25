import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
} from '@airport/tarmaq-entity'
import { UserAccount_PublicSigningKey, UserAccount_LocalId, UserAccount_Username } from '@airport/aviation-communication'
import { IUserAccount } from '@airport/ground-control'

@Entity()
export class UserAccount
	implements IUserAccount {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'USER_ACCOUNT_LID', nullable: false })
	_localId: UserAccount_LocalId

	// doubles as the GUID
	@Column({ name: 'ACCOUNT_PUBLIC_SIGNING_KEY', nullable: false })
	@DbString()
	accountPublicSigningKey?: UserAccount_PublicSigningKey

	@Column({ name: "USERNAME", nullable: false })
	@DbString()
	username?: UserAccount_Username;

}
