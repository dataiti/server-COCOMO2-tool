const authRouter = require("./auth.route");
const calculateRouter = require("./calculate.route");

const routers = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/calculate", calculateRouter);
};

module.exports = routers;
