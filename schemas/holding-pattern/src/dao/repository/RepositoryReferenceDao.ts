import { IContext } from '@airport/direction-indicator'
import { IRepositoryReference, Repository_GUID } from '@airport/ground-control'
import { Y } from '@airport/tarmaq-query';
import { BaseRepositoryReferenceDao } from '../../generated/baseDaos';
import Q_airport____at_airport_slash_holding_dash_pattern from '../../generated/qApplication';
import { QRepository, QRepositoryReference } from '../../generated/qInterfaces';

export class RepositoryReferenceDao
    extends BaseRepositoryReferenceDao {

    async findByReferencingRepository_GUIDs(
        repositoryGUIDs: Repository_GUID[],
        context: IContext
    ): Promise<IRepositoryReference[]> {
        let rr: QRepositoryReference,
            r: QRepository

        return await this._find({
            SELECT: {
                referencedRepository: {
                    _localId: Y,
                    GUID: Y
                },
                referencingRepository: {
                    _localId: Y,
                    GUID: Y
                }
            },
            FROM: [
                rr = Q_airport____at_airport_slash_holding_dash_pattern
                    .RepositoryReference,
                r = rr.referencingRepository.INNER_JOIN(),
                rr.referencedRepository.INNER_JOIN()
            ],
            WHERE: r.GUID.IN(repositoryGUIDs)
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
