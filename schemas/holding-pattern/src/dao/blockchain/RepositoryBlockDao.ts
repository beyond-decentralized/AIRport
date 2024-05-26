import {
	IRepositoryBlock
} from '@airport/ground-control'
import Q from '../../generated/qApplication'
import { IContext, Injected } from '@airport/direction-indicator'
import { BaseRepositoryBlockDao } from '../../generated/baseDaos'
import { QRepositoryBlock } from '../../generated/qInterfaces'
import { Y } from '@airport/tarmaq-query'

export interface IRepositoryBlockDao {

	findWhereGUIDsIn(
		GUIDs: string[],
		context: IContext
	): Promise<IRepositoryBlock[]>
	
	// insert(
	// 	blocks: IRepositoryBlock[],
	// 	context: IContext
	// ): Promise<void>

	updateSyncTimestamp(
		repositoryBlock: IRepositoryBlock,
		context: IContext
	): Promise<void>

}

@Injected()
export class RepositoryBlockDao
	extends BaseRepositoryBlockDao
	implements IRepositoryBlockDao {

	async findWhereGUIDsIn(
		GUIDs: string[],
		context: IContext
	): Promise<IRepositoryBlock[]> {
		let rth: QRepositoryBlock
		return await this.db.find.tree({
			SELECT: {
				GUID: Y
			},
			FROM: [
				rth = Q.RepositoryBlock
			],
			WHERE: rth.GUID.IN(GUIDs)
		}, context)
	}

	// async insert(
	// 	blocks: IRepositoryBlock[],
	// 	context: IContext
	// ): Promise<void> {
    //     let aac: QRepositoryBlock;
    //     const VALUES = []
    //     for (const block of blocks) {
    //         VALUES.push([
    //             block._localId,
    //             block.name,
    //             block.applicationVersion._localId,
    //         ])
    //     }
    //     await this.db.insertValuesGenerateIds({
    //         INSERT_INTO: aac = Q_airport____at_airport_slash_airspace.ApplicationApiClass,
    //         columns: [
    //             aac._localId,
    //             aac.name,
    //             aac.applicationVersion._localId
    //         ],
    //         VALUES
    //     }, context)
	// }

	async updateSyncTimestamp(
		repositoryBlock: IRepositoryBlock,
		context: IContext
	): Promise<void> {
		let rth: QRepositoryBlock

		await this.db.updateWhere({
			UPDATE: rth = Q.RepositoryBlock,
			SET: {
				syncTimestamp: repositoryBlock.syncTimestamp
			},
			WHERE: rth._localId.equals(repositoryBlock._localId)
		}, context)
	}
}
