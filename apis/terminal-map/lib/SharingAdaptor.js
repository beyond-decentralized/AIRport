"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
var deltaStore;
(function (deltaStore) {
    var platform;
    (function (platform) {
        platform.GOOGLE = 'GOOGLE';
        platform.IN_MEMORY = 'IN_MEMORY';
        platform.STUB = 'STUB';
        function getName(platformType) {
            switch (platformType) {
                case ground_control_1.PlatformType.GOOGLE_DOCS:
                    return platform.GOOGLE;
                case ground_control_1.PlatformType.IN_MEMORY:
                    return platform.IN_MEMORY;
                case ground_control_1.PlatformType.STUB:
                    return platform.STUB;
                default:
                    throw new Error(`Unsupported Platform Type: ${deltaStore.distributionStrategy}`);
            }
        }
        platform.getName = getName;
        function getValue(platformTypeName) {
            switch (platformTypeName) {
                case platform.GOOGLE:
                    return ground_control_1.PlatformType.GOOGLE_DOCS;
                case platform.IN_MEMORY:
                    return ground_control_1.PlatformType.IN_MEMORY;
                case platform.STUB:
                    return ground_control_1.PlatformType.STUB;
                default:
                    throw new Error(`Unsupported Platform Type name: ${platformTypeName}`);
            }
        }
        platform.getValue = getValue;
    })(platform = deltaStore.platform || (deltaStore.platform = {}));
})(deltaStore = exports.deltaStore || (exports.deltaStore = {}));
(function (deltaStore) {
    var distributionStrategy;
    (function (distributionStrategy_1) {
        distributionStrategy_1.S3_DISTRIBUTED_PUSH = 'S3_DISTRIBUTED_PUSH';
        distributionStrategy_1.S3_SECURE_POLL = 'S3_SECURE_POLL';
        function getName(distributionStrategy) {
            switch (distributionStrategy) {
                case ground_control_1.DistributionStrategy.S3_DISTIBUTED_PUSH:
                    return distributionStrategy_1.S3_DISTRIBUTED_PUSH;
                case ground_control_1.DistributionStrategy.S3_SECURE_POLL:
                    return distributionStrategy_1.S3_SECURE_POLL;
                default:
                    throw new Error(`Unsupported Distribution Strategy: ${distributionStrategy}`);
            }
        }
        distributionStrategy_1.getName = getName;
        function getValue(distributionStrategyName) {
            switch (distributionStrategyName) {
                case distributionStrategy_1.S3_DISTRIBUTED_PUSH:
                    return ground_control_1.DistributionStrategy.S3_DISTIBUTED_PUSH;
                case distributionStrategy_1.S3_SECURE_POLL:
                    return ground_control_1.DistributionStrategy.S3_SECURE_POLL;
                default:
                    throw new Error(`Unsupported Distribution Strategy name: ${distributionStrategyName}`);
            }
        }
        distributionStrategy_1.getValue = getValue;
    })(distributionStrategy = deltaStore.distributionStrategy || (deltaStore.distributionStrategy = {}));
})(deltaStore = exports.deltaStore || (exports.deltaStore = {}));
//# sourceMappingURL=SharingAdaptor.js.map