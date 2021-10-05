import { and } from '@airport/air-control'
import { DI } from '@airport/di'
import { IApplication, Q, QApplication, QDomain } from '..'
import {
	BaseApplicationDao,
	IBaseApplicationDao
} from '../generated/baseDaos'
import { APPLICATION_DAO } from '../tokens'

export interface IApplicationDao
	extends IBaseApplicationDao {

	findByDomainNameAndName(
		domainName: string,
		name: string
	): Promise<IApplication>

}

export class ApplicationDao
	extends BaseApplicationDao
	implements IApplicationDao {

	async findByDomainNameAndName(
		domainName: string,
		name: string
	): Promise<IApplication> {
		let a: QApplication
		let d: QDomain
		return await this.db.findOne.tree({
			select: {},
			from: [
				a = Q.Application,
				d = a.domain.innerJoin()
			],
			where: and(
				d.name.equals(domainName),
				a.name.equals(name)
			)
		})
	}

}

DI.set(APPLICATION_DAO, ApplicationDao)
