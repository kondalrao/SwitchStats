const switchDetails = require('./switch-details');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.use('/test', new switchDetails());
};
