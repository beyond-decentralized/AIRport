/**
 * Possible distribution strategies for Change List Federations.
 *
 * A common (and only currently supported) basic setup:
 *
 * There is always a Single Shared Store (S3).
 * There are always at least one or more 'Personal' Stores.
 *
 * The stores communicate via servers that propagate data from
 * personal stores to the shared store.
 *
 * What differs is how this propagation is accomplished.
 *
 * In the future, we'll add a truly distributed setup, without any S3s.
 */
export var DistributionStrategy;
(function (DistributionStrategy) {
    /**
     *  The server is aware of all Personal Stores and it
     *  subscribes to any possible changes in any of these stores.
     *  It is the server's responsibility to update the S3.
     */
    DistributionStrategy[DistributionStrategy["S3_SECURE_POLL"] = 0] = "S3_SECURE_POLL";
    /**
     * There is no need for a server, all clients are aware of S3
     * and are responsible for pushing their changes to it.
     */
    DistributionStrategy[DistributionStrategy["S3_DISTIBUTED_PUSH"] = 1] = "S3_DISTIBUTED_PUSH";
})(DistributionStrategy || (DistributionStrategy = {}));
//# sourceMappingURL=DistributionStrategy.js.map