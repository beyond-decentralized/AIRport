export interface IAsymmetricKey {

    private: string
    public: string

}

export interface IKeyUtils {

    digest(
        str: string,
        bitLength: number
    ): Promise<string>

    getEncryptionKey(
        length?: number
    ): Promise<string>

    getSigningKey(
        curveBitLength?: number
    ): Promise<IAsymmetricKey>

    sha512(
        str: string
    ): Promise<string>

    sha1(
        str: string
    ): Promise<string>

    sign(
        text: string,
        privateKey: string,
        privateKeyBitLength?: number
    ): Promise<string>

    verify(
        text: string,
        signature: string,
        publicKey: string,
        publicKeyBitLength?: number
    ): Promise<boolean>

}
