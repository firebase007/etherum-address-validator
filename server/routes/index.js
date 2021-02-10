'use strict';

const addressRouter = require("./address");


module.exports = (app) => {
  app.use("/api/v1/address/", addressRouter);
};
