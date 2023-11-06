import {
    IAsymmetricKey,
    IKeyUtils
} from "../../definition/utils/IKeyUtils"

export class KeyUtils
    implements IKeyUtils {

    textDecoder = new TextDecoder("utf-8")
    textEncoder = new TextEncoder()

    digest(
        str: string,
        bitLength: number
    ): Promise<string> {
        return crypto.subtle.digest("SHA-" + bitLength,
            new TextEncoder(/*"utf-8"*/).encode(str)).then(buf => {
                return Array.prototype.map
                    .call(new Uint8Array(buf),
                        x => (('00' + x.toString(16)).slice(-2))).join('')
            })
    }

    async getEncryptionKey(
        length: number = 256
    ): Promise<string> {
        const encryptionKey = await window.crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length
            },
            true,
            ["encrypt", "decrypt"]
        )
        const serializedEncryptionKey = await this.serializeKey(encryptionKey)

        return serializedEncryptionKey
    }

    async getSigningKey(
        curveBitLength: number = 384
    ): Promise<IAsymmetricKey> {
        let keyPair = await window.crypto.subtle.generateKey(
            {
                name: "ECDSA",
                namedCurve: "P-" + curveBitLength
            },
            true,
            ["sign", "verify"]
        )

        const privateSigningKey = await this.serializeKey(keyPair.privateKey)
        const publicSigningKey = await this.serializeKey(keyPair.publicKey)

        return {
            private: privateSigningKey,
            public: publicSigningKey
        }
    }

    sha512(
        str: string
    ): Promise<string> {
        return this.digest(str, 512)
    }

    sha1(
        str: string
    ): Promise<string> {
        return this.digest(str, 1)
    }

    async sign(
        text: string,
        privateKey: string,
        privateKeyBitLength: number = 384
    ): Promise<string> {
        const encoded = this.textEncoder.encode(text)
        const signKey = await this.deserializeSignKey(privateKey, privateKeyBitLength)

        const signature = await window.crypto.subtle.sign(
            {
                name: "ECDSA",
                hash: { name: "SHA-" + this.getHashSize(privateKeyBitLength) },
            },
            signKey,
            encoded
        )

        return this.textDecoder.decode(signature)
    }

    async verify(
        text: string,
        signature: string,
        publicKey: string,
        publicKeyBitLength: number = 384
    ): Promise<boolean> {
        const encodedText = this.textEncoder.encode(text)
        const encodedSignature = this.textEncoder.encode(signature)
        const verifyKey = await this.deserializeVerifyKey(publicKey, publicKeyBitLength)



        let isValidSignature = await window.crypto.subtle.verify(
            {
                name: "ECDSA",
                hash: {
                    name: "SHA-" + this.getHashSize(publicKeyBitLength)
                },
            },
            verifyKey,
            encodedSignature,
            encodedText
        )

        return isValidSignature
    }

    private getHashSize(
        keyLength: number
    ): number {
        if (keyLength <= 384) {
            return 384
        }

        return 512
    }

    private async serializeKey(
        rawKey: CryptoKey
    ): Promise<string> {
        const exportedPrivateSigningKey = await window.crypto.subtle.exportKey(
            "jwk",
            rawKey
        );

        return JSON.stringify(exportedPrivateSigningKey, null, " ")
    }

    private async deserializeSignKey(
        serializedKey: string,
        privateKeyBitLength: number = 384
    ): Promise<CryptoKey> {
        const jwk = JSON.parse(serializedKey)
        return window.crypto.subtle.importKey(
            "jwk",
            jwk,
            {
                name: "ECDSA",
                namedCurve: "P-" + privateKeyBitLength
            },
            true,
            ["sign"]
        );
    }

    private async deserializeVerifyKey(
        serializedKey: string,
        privateKeyBitLength: number = 384
    ): Promise<CryptoKey> {
        const jwk = JSON.parse(serializedKey)
        return window.crypto.subtle.importKey(
            "jwk",
            jwk,
            {
                name: "ECDSA",
                namedCurve: "P-" + privateKeyBitLength
            },
            true,
            ["verify"]
        )
    }

    private async deserializeEncryptionKey(
        serializedKey: string
    ): Promise<CryptoKey> {
        const jwk = JSON.parse(serializedKey)

        return window.crypto.subtle.importKey(
            "jwk",
            jwk,
            "AES-GCM",
            true,
            ["encrypt", "decrypt"]
        )
    }

}
