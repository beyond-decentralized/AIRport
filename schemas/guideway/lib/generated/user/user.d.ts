import { ISecurityAnswer } from './security/securityanswer';
import { IUserRepository } from './userrepository';
import { ITerminal } from '../terminal/terminal';
import { IAgtRepositoryTransactionBlock } from '../synchronization/agtrepositorytransactionblock';
export interface IUser {
    id: number;
    hash?: string;
    email?: string;
    isInvitation?: boolean;
    securityAnswers?: ISecurityAnswer[];
    userRepositories?: IUserRepository[];
    terminals?: ITerminal[];
    repositoryTransactionBlocks?: IAgtRepositoryTransactionBlock[];
}
//# sourceMappingURL=user.d.ts.map