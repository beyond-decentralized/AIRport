import { BasicServer } from "@airport/nonhub-types";
export class ScyllaDbServer extends BasicServer {
    async doStartResources() {
        const cassandra = require('cassandra-driver');
        const authProvider = new cassandra.auth.PlainTextAuthProvider('scylla', 'PASSWORD');
        this.scyllaDbClient = new cassandra.Client({
            authProvider,
            contactPoints: [
                'scylla-node1',
                'scylla-node2',
                'scylla-node3'
            ],
            // localDataCenter: 'DC1',
            keyspace: 'votecube',
            sslOptions: false,
        });
        return new Promise((resolve, reject) => {
            this.scyllaDbClient.connect((error) => {
                if (error) {
                    console.log('Error connecting to ScyllaDb');
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    shutdownResources() {
        this.scyllaDbClient.shutdown((err) => {
            if (err) {
                console.log('error shutting down ScyllaDb connection', err);
            }
            else {
                console.log('ScyllaDb connection shutdown successfully', err);
            }
            console.log('ScyllaDb closed.');
            this.shutdownAdditionalResources().then();
        });
    }
    async shutdownAdditionalResources() {
        process.exit(0);
    }
}
//# sourceMappingURL=ScyllaDbServer.js.map