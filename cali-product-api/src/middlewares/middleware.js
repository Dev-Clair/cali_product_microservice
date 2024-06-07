const validator = require("validator");

let validationError = [];

validateRequestParams = (req, res, next) => {
  if (validator.isEmpty(req.params.id)) {
    validationError.push(`Missing request id in url: ${req.OriginalUrl}`);

    return res.status(422).json({
      error: { validationError },
    });
  }

  if (!validator.isUUID(req.params.id, 4)) {
    validationError.push(
      `${req.params.id} is not a valid uuid format or version`
    );

    return res.status(422).json({
      error: { validationError },
    });
  }

  next();
};

const checkRequestContentType = (req, res, next) => {
  const getContentType = req.get("Content-Type");

  if (getContentType !== "application/json") {
    return res.status(400).json({
      message: "Invalid content type",
      expected: "application/json",
      received: `${getContentType}`,
    });
  }

  next();
};

const checkRequestSecurity = (req, res, next) => {
  const getProtocol = req.protocol;

  const getSecurity = req.secure;

  if (getProtocol !== "https" || getSecurity === false) {
    return res.status(403).json({ message: "Connection is not secure." });
  }

  next();
};

module.exports = {
  checkRequestContentType,
  checkRequestSecurity,
  validateRequestParams,
};
