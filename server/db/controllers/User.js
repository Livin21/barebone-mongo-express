const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const ResponseTemplates = require("../../utils/ResponseTemplates");
const respond = require("../../utils/Responder");
const Constants = require("../../utils/Constants");

module.exports = {
  async signup(username, password) {
    if (!username)
      return ResponseTemplates.badRequestTemplate("Invalid Username");
    if (!password)
      return ResponseTemplates.badRequestTemplate("Please enter a password");
    return ResponseTemplates.dataTemplate(
      await User.create({
        username,
        password: await bcrypt.hashSync(password, bcrypt.genSaltSync(4), null)
      })
    );
  },
  async login(username, password) {
    if (!username)
      return ResponseTemplates.badRequestTemplate("Invalid Username");
    if (!password)
      return ResponseTemplates.badRequestTemplate("Please enter your password");
    let user = await User.findOne({ username });
    if (!bcrypt.compareSync(password, user.password))
      return ResponseTemplates.unAuthorizedRequestTemplate();
    let access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7 // expires in 7 days
    });
    return ResponseTemplates.dataTemplate({
      access_token,
      username: user.username,
      id: user._id
    });
  },
  verifyToken(req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token)
      return respond(
        res,
        Constants.RESPONSE_CODES.UN_AUTHORIZED,
        ResponseTemplates.unAuthorizedRequestTemplate()
      );
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return respond(
          res,
          401,
          ResponseTemplates.unAuthorizedRequestTemplate()
        );
      // if everything good, save to request for use in other routes
      req.user = await User.findOne({ _id: decoded.id }).catch(error => {
        console.error(error);
        return respond(
          res,
          Constants.RESPONSE_CODES.UN_AUTHORIZED,
          ResponseTemplates.unAuthorizedRequestTemplate()
        );
      });
      next();
    });
  }
};
