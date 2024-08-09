import * as crypto from "crypto";
import * as uuid from "uuid";

import { config } from "dotenv";
config();

export const getTokenForImageKit = (req, res) => {
  var token = req.query.token || uuid.v4();
  var expire = req.query.expire || parseInt(Date.now() / 1000) + 2400;
  var privateAPIKey = process.env.PRIVATE_API_KEY;
  var signature = crypto
    .createHmac("sha1", privateAPIKey)
    .update(token + expire)
    .digest("hex");
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  res.status(200);
  res.send({
    token: token,
    expire: expire,
    signature: signature,
  });
};
