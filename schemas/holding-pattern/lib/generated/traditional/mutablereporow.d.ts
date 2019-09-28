import { IImmutableRepoRow } from './immutablereporow';
export interface IMutableRepoRow extends IImmutableRepoRow {
    updatedAt?: Date;
}
