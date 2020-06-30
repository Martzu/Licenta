let crypto = require("crypto");

let cryptedTextIndex = process.argv.length - 1;

let cryptedMessage = process.argv[cryptedTextIndex];

let secretKey = crypto.createDecipher('aes-128-cbc', "hey");

let decipherText = secretKey.update(cryptedMessage, 'hex', 'utf8');

decipherText += secretKey.final('utf8');

let output = decipherText;

fs = require('fs');

fs.writeFile("decipherText.txt", output, () => console.log("Done!"));