import { IContext } from '@airport/direction-indicator'
import { IRepositoryReference, Repository_LocalId } from '@airport/ground-control'
import { BaseRepositoryReferenceDao } from '../../generated/baseDaos';
import Q_airport____at_airport_slash_holding_dash_pattern from '../../generated/qApplication';
import { QRepositoryReference } from '../../generated/qInterfaces';

export class RepositoryReferenceDao
    extends BaseRepositoryReferenceDao {

    async findByReferencingRepository_LocalIds(
        repositoryLocalIds: Repository_LocalId[],
		context: IContext
    ): Promise<IRepositoryReference[]> {
        let rr: QRepositoryReference

        return await this._find({
            SELECT: {},
            FROM: [
                rr = Q_airport____at_airport_slash_holding_dash_pattern
                    .RepositoryReference
            ],
            WHERE: rr.referencingRepository._localId
                .IN(repositoryLocalIds)
        }, context)
    }

    async insert(
        repositoryReferences: IRepositoryReference[],
        context: IContext
    ): Promise<void> {
        let rr: QRepositoryReference;

        const VALUES = []
        for (const repositoryReference of repositoryReferences) {
            VALUES.push([
                repositoryReference.referencingRepository._localId,
                repositoryReference.referencedRepository._localId
            ])
        }

        await this.db.insertValuesGenerateIds({
            INSERT_INTO: rr = Q_airport____at_airport_slash_holding_dash_pattern
                .RepositoryReference,
            columns: [
                rr.referencingRepository._localId,
                rr.referencedRepository._localId
            ],
            VALUES
        }, context)
    }

}
