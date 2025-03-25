const PayU = require("payu-websdk");

const payu_key = process.env.PAYU_KEY;
const payu_salt = process.env.PAYU_SALT;

const payuClient = new PayU({
  key:payu_key,
  salt:payu_salt,
},process.env.PAYU_ENVIRONMENT);

exports.PayData ={
    payuClient,
    payu_key,
    payu_salt,
}