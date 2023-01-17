const crypto = require("crypto")

class JWT {
    constructor({ crypto }) {
        this.crypto = crypto
    }

    sign(data, options = {}) {
        const header = this.encode({ tpy: "JWT", alg: "HS256" }) //base64url
        const payload = this.encode({ ...data, ...options }) //base64url
        const signature = this.createSignature([header, payload])

        // return `${header}.${payload}.${signature}`
        return [header, payload, signature].join(".")
    }

    // token:string
    verify(token, salt) {
        const [header, payload, signature] = token.split(".")
        const newSignature = this.createSignature([header, payload], salt)
        if (newSignature !== signature) {
            throw new Error("Invalid")
        }

        return this.decode(payload)
    }

    encode(obj) {
        return Buffer.from(JSON.stringify(obj)).toString("base64Url")
    }

    decode(base64) {
        return JSON.parse(Buffer.from(base64, "base64").toString("utf-8"))
    }

    createSignature(base64urls, salt = "tistory") {
        // header.payload .join
        const data = base64urls.join(".")
        return this.crypto.createHmac("sha256", salt).update(data).digest("base64Url")
    }
}

const jwt = new JWT({ crypto })

const token = jwt.sign({ userid: "Hynn", username: "hyunsign" }) // JWT
console.log(token)
// Header.Payload.Signature

const payload = jwt.verify("Header.Payload.Signature", "hynn")
console.log(payload)