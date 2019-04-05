/**
 * Created by Papa on 4/3/2019.
 */
/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
export declare function transactional<T>(callback: () => Promise<T>, keepAlive?: boolean): Promise<T>;
