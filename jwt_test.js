const crypto = require('crypto');

const header = {
    alg :"HS256",
    typ : "JWT"
}

const payload = {
    sub : "1234567890",
    userId : "admin",
    iat : 1516239022
}

function encode(obj){
    return Buffer.from(JSON.stringify(obj)).toString("base64");
}

const header64 = encode(header);
const payload64 = encode(payload);

console.log("header64", header64);
console.log("payload64", payload64);

const 평문 = header64 + "." + payload64;
console.log("평문", 평문);

const signature = crypto.createHmac("sha256", "hynnBlog").update(평문).digest("base64");
const signature2 = crypto.createHmac("sha256", "HynnBlog").update(평문).digest("base64url");
console.log("signature", signature);
console.log("signature2", signature2);