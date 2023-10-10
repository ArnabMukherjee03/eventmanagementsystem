const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { sanitizeUser, cookieExtractor } = require("./common");


exports.initializePassport = (passport) => {
  const opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = process.env.JWT_SECRET_KEY;

  //$ Passport Strategies
  passport.use(
    "local",
    new LocalStrategy({ usernameField: "email" }, async function (
      email,
      password,
      done
    ) {
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, "invalid credentials"); // for safety
        }
        const validPassword = await bcrypt.compare(password, user.password);


        if (!validPassword) {
          return done(null, false, "invalid credentials");
        }

        const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
        done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
      } catch (err) {
        done(err, false);
      }
    })
  );

  passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, sanitizeUser(user)); // this calls serializer
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

  //$ this creates session variable req.user on being called from callbacks
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, { id: user.id, role: user.role });
    });
  });

  //$ this changes session variable req.user when called from authorized request
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
