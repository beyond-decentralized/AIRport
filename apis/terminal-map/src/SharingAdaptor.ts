import {
	DistributionStrategy,
	PlatformType
}                         from '@airport/ground-control'
import {SharedChangeList} from './sync/SharedChangeList'

/**
 * Created by Papa on 1/10/2016.
 */

export interface ChangeListShareInfo {
	name: string;
	dbId: string;
}

export interface SharingPlatformSetupInfo {
	platformType: PlatformType;
	recordIdField: string;
	dbIdField: string;
}

export namespace deltaStore.platform {
	export const GOOGLE    = 'GOOGLE'
	export const IN_MEMORY = 'IN_MEMORY'
	export const STUB      = 'STUB'

	export function getName(
		platformType: PlatformType
	): string {
		switch (platformType) {
			case PlatformType.GOOGLE_DOCS:
				return GOOGLE
			case PlatformType.IN_MEMORY:
				return IN_MEMORY
			case PlatformType.STUB:
				return STUB
			default:
				throw new Error(
					`Unsupported Platform Type: ${distributionStrategy}`)
		}
	}

	export function getValue(
		platformTypeName: string
	): PlatformType {
		switch (platformTypeName) {
			case GOOGLE:
				return PlatformType.GOOGLE_DOCS
			case IN_MEMORY:
				return PlatformType.IN_MEMORY
			case STUB:
				return PlatformType.STUB
			default:
				throw new Error(
					`Unsupported Platform Type name: ${platformTypeName}`)
		}
	}

}

export namespace deltaStore.distributionStrategy {

	export const S3_DISTRIBUTED_PUSH = 'S3_DISTRIBUTED_PUSH'
	export const S3_SECURE_POLL      = 'S3_SECURE_POLL'

	export function getName(
		distributionStrategy: DistributionStrategy
	): string {
		switch (distributionStrategy) {
			case DistributionStrategy.S3_DISTIBUTED_PUSH:
				return S3_DISTRIBUTED_PUSH
			case DistributionStrategy.S3_SECURE_POLL:
				return S3_SECURE_POLL
			default:
				throw new Error(
					`Unsupported Distribution Strategy: ${distributionStrategy}`)
		}
	}

	export function getValue(
		distributionStrategyName: string
	): DistributionStrategy {
		switch (distributionStrategyName) {
			case S3_DISTRIBUTED_PUSH:
				return DistributionStrategy.S3_DISTIBUTED_PUSH
			case S3_SECURE_POLL:
				return DistributionStrategy.S3_SECURE_POLL
			default:
				throw new Error(
					`Unsupported Distribution Strategy name: ${distributionStrategyName}`)
		}
	}
}

export interface SharingAdaptor {

	setupInfoBelongsTo(
		setupInfo: SharingPlatformSetupInfo,
		setupInfos: SharingPlatformSetupInfo[]
	): boolean;

	initialize(
		setupInfo: SharingPlatformSetupInfo
	): Promise<any>;

	findExistingChangeLists(
		setupInfo: SharingPlatformSetupInfo
	): Promise<ChangeListShareInfo[]>;

	createChangeList(
		shareInfo: ChangeListShareInfo,
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharedChangeList>;

	loadChangeList(
		shareInfo: ChangeListShareInfo,
		setupInfo: SharingPlatformSetupInfo
	): Promise<SharedChangeList>;

}
