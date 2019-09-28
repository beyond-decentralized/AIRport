import {
	ISecurityAnswer,
} from './security/securityanswer';
import {
	IUserRepository,
} from './userrepository';
import {
	ITerminal,
} from '../terminal/terminal';
import {
	IAgtRepositoryTransactionBlock,
} from '../synchronization/agtrepositorytransactionblock';



//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IUser {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	hash?: string;
	email?: string;
	isInvitation?: boolean;

	// Non-Id Relations
	securityAnswers?: ISecurityAnswer[];
	userRepositories?: IUserRepository[];
	terminals?: ITerminal[];
	repositoryTransactionBlocks?: IAgtRepositoryTransactionBlock[];

	// Transient Properties

	// Public Methods
	
}


