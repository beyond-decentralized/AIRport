/**
 * Created by Papa on 4/17/2016.
 */
/**
 * Transactional context talks to a terminal.  In a multi-terminal setup the same
 * transactional method might be used to talk to different databases.  The most strait
 * forward way to specify which terminal to talk to is to pass in an argument to the
 * method that provides the transactional client.  However is very clumbersome from the
 * API point of view.
 *
 * Perhaps another approach is to simply setup a global marker to start a transaction
 * on the next DB operation (if one isn't set already).  And before exit from the method
 * clear that marker.  However the transaction still must be committed or rolled back
 * at the end. So, a callback approach can be taken such that a callback object provides
 * the transaction client on which to commit or rollback a transaction.
 *
 * This limits transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 *
 * @returns {MethodDecorator}
 * @constructor
 */
//# sourceMappingURL=decorators.d.ts.map