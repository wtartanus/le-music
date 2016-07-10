var fs = require('fs');
var S3FS = require('s3fs');


module.exports = function(router, passport) {

  router.use(passport.authenticate('bearer', { session: false }));
  router.use(function(req, res, next) {
    fs.appendFile('logs.txt',req.path + "token: " + req.query.access_token)
  });
}