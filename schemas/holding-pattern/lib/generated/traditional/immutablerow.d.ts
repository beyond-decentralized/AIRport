import { IStageable } from '../infrastructure/stageable';
import { IUser } from '@airport/travel-document-checkpoint';
export interface IImmutableRow extends IStageable {
    createdAt?: Date;
    user?: IUser;
}
//# sourceMappingURL=immutablerow.d.ts.map