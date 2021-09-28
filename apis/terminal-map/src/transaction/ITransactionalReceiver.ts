export interface ITransactionalReceiver {

    onMessage(callback: (
        message: any
    ) => void)

}
