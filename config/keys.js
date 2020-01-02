// If prod, pull from environment, otherwise pull from dev (not in VCS).
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
