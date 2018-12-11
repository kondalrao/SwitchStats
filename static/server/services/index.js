const switchDetails = require('./switch-details');
const cpuInfo = require('./cpu-info');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.use('/version', new switchDetails());
  app.use('/cpuInfo', new cpuInfo());
};
