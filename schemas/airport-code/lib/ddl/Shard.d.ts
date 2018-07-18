export declare type ShardAddress = string;
export declare type ShardDescription = string;
export declare type ShardId = number;
export declare type ShardSecret = string;
export declare class Shard {
    id: ShardId;
    description: ShardDescription;
    secret: ShardSecret;
    address: ShardAddress;
}
