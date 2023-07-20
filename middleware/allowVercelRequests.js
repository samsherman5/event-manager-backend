module.exports = (req, res, next) => {
  const deploymentUrl = req.headers["vercel-deployment-url"];
  if (deploymentUrl !== process.env.FRONTEND_ADDRESS) {
    return res.sendStatus(403);
  }
  next();
};
