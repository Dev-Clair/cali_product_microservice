const checkRequestContentType = (req, res, next) => {
  const get_content_type = req.get("Content-Type");

  if (get_content_type !== "application/json") {
    return res.status(400).json({
      message: "Invalid content type",
      expected: "application/json",
      received: `${get_content_type}`,
    });
  }

  next();
};

const checkRequestSecurity = (req, res, next) => {
  const get_protocol = req.protocol;

  const get_security = req.secure;

  if (get_protocol !== "https" || get_security === false) {
    return res.status(403).json({ message: "Connection is not secure." });
  }

  next();
};

module.exports = { checkRequestContentType, checkRequestSecurity };
