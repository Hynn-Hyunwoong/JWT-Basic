// NPM Install Crypto
const crypto = require ('crypto');
// // String 
// const str = "Hello world of the world!";

// // Encode Base64
// const buf = Buffer.from(str);
// console.log('encode',buf); // Buffer 2
// console.log('16', buf.toString("hex")); // 16
// console.log('base64', buf.toString("base64")); // 64

const header = {
    alg: "HS256",
    type : "JWT"
}

const headerString = JSON.stringify(header);
console.log(headerString); // String

const buf2 = Buffer.from(headerString).toString("base64");
console.log(buf2); // 64 Encoded

const json = Buffer.from("eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ==", "base64").toString("utf8")
console.log(json); // String

//SingleLine Encryption
// SHA, 32Byte. input any data = result of 32byte.(16)
// 1byte = 8 bit = 2 Ni-ble

// crypto - Class , Static Method 
const salt = process.env.SALT || "Cho"
const hash = crypto.createHmac("sha256", salt).update("test").digest("hex");
console.log("test crypto1",hash); 
console.log('length of hash', hash.length);

const hashBuf = Buffer.from(hash).toString("base64");
console.log("hashBuf2", hashBuf);
