const credential = require('./credentials.js');

module.exports = function (env) {
  switch(env){
    case "development":
      return {
        url: `mongodb://admin:${credential.ATLAS_USER_PASSWORD}@ds117806.mlab.com:17806/brainstorm`,
      };
    default:
      return {
        url: `mongodb://admin:${credential.ATLAS_USER_PASSWORD}@ds117806.mlab.com:17806/brainstorm`,
      };
  }
};
