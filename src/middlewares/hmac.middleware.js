const crypto = require("crypto");
const { AppError } = require("../common/error");

const secretKey = process.env.HMAC_SECRET;

const validateHMAC = (req, res, next) => {
  try {
    const receivedSignature = req.get("x-hmac-signature");

    if (!receivedSignature) {
      throw new AppError("Missing HMAC signature", 401);
    }

    let signatureString;
    switch (req.method) {
      case "GET":
        signatureString = `${req.path}/${req.params.id}`;
        break;

      case "POST":
        const payload = JSON.stringify(req.body);
        signatureString = payload;
        break;

      case "DELETE":
        signatureString = `${req.path}/${req.params.id}`;
        break;

      case "PATCH":
        signatureString = `${req.path}/${req.params.id}`;
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
