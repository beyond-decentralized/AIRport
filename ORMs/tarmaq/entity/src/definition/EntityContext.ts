import { IContext } from '@airport/direction-indicator'
import { DbEntity } from '@airport/ground-control'

export interface IEntityContext
	extends IContext {
	dbEntity?: DbEntity
}