const { auth0 } = require('../config/config')
const { auth } = require('express-oauth2-jwt-bearer');

exports.ensureAuth = auth({
  audience: auth0.audience,
  issuerBaseURL: auth0.issuer,
  tokenSigningAlg: 'RS256'
});