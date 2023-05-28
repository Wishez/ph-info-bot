import cryptoJs from 'crypto-js'

const { enc, Rabbit, SHA1 } = cryptoJs

const secret = 'hashEverything'
export const HashingService = {
  encodeToRabbit(data: Record<string, unknown>) {
    return Rabbit.encrypt(JSON.stringify(data), secret).toString()
  },

  decodeFromRabbit<GModel extends object>(hash: string): GModel {
    if (!hash) return {} as GModel

    return JSON.parse(Rabbit.decrypt(hash, secret).toString(enc.Utf8))
  },

  sha1(data: Record<string, unknown> | string) {
    return SHA1(typeof data === 'string' ? data : JSON.stringify(data)).toString()
  },
}
