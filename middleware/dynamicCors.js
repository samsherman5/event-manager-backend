module.exports = (req, res, next) => {
  const origin = req.get("Origin");

  // Check if the 'Origin' header is present in the request
  if (origin) {
    // Set the 'Access-Control-Allow-Origin' header to the value of the 'Origin' header
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Set other CORS headers and allow the required methods, headers, and credentials
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, day, vercel-deployment-url"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    // Respond with HTTP OK status (200)
    return res.sendStatus(200);
  }

  // Call the next middleware in the chain
  next();
};
