import {
	DI
}                        from '@airport/di'
import {
	SYNCHRONIZATION_OUT_MANAGER,
}                        from '../../tokens'

export interface ISynchronizationOutManager {

}

export class SynchronizationOutManager
	implements ISynchronizationOutManager {


}
DI.set(SYNCHRONIZATION_OUT_MANAGER, SynchronizationOutManager)
