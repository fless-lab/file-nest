const crypto = require("crypto");
const { AppError } = require("../common/error");

const secretKey = process.env.HMAC_SECRET;

const   validateHMAC = (req, res, next) => {
  try {
    const receivedSignature = req.get("x-hmac-signature");

    if (!receivedSignature) {
      throw new AppError("Missing HMAC signature", 401);
    }

    console.log("req.params : ",req.params,req.url)
    let signatureString;
    const comparator = req.method.toUpperCase();
    const tempParam = req.url.split("/");
    const idParam = tempParam[tempParam.length -1];
    switch (comparator) {
      case "GET":
        signatureString = `${comparator}/${req.params.id??idParam}`;
        break;

      case "POST":
        const payload = JSON.stringify(req.body);
        signatureString = payload;
        break;

      case "DELETE":
        signatureString = `${comparator}/${req.params.id??idParam}`;
        break;

      case "PATCH":
        signatureString = `${comparator}/${req.params.id??idParam}`;
        break;

      default:
        throw new AppError("Method not allowed", 405);
    }
    
    const calculatedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(signatureString)
      .digest("hex");

    if (calculatedSignature !== receivedSignature) {
      throw new AppError("Invalid HMAC signature", 401);
    }
    next();
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = validateHMAC;
