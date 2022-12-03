const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const api_key = require("../config/config");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(api_key.googleAuth);

exports.googleLogin = (req, res, next) => {
  const { tokenId } = req.body;
  const random = Math.random().toString(36).slice(-8);

  //console.log(process.env.OAuth2Client)
  client
    .verifyIdToken({ idToken: tokenId, audience: api_key.googleAuth })
    .then((response) => {
      const { email, email_verified, name } = response.payload;
      console.log(response.payload);
      if (!email_verified) {
        const error = new Error("Login failed, user not verified");
        error.statusCode = 403;
        res.status(403).json({ message: "not verified" });
        throw error;
      } else if (email_verified) {
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              // new user
              bcrypt.hash(random, 12).then((hashedPassword) => {
                const Newuser = new User({
                  email: email,
                  password: hashedPassword,
                  isverified: true,
                  name: name,
                  resetVerified: false,
                  isAdmin: false,
                });
                Newuser.save()
                  .then((result) => {
                    const access_token = jwt.sign(
                      { email: email },
                      api_key.accessToken,
                      {
                        algorithm: "HS256",
                        expiresIn: api_key.accessTokenLife,
                      }
                    );

                    const referesh_token = jwt.sign(
                      { email: email },
                      api_key.refereshToken,
                      {
                        algorithm: "HS256",
                        expiresIn: api_key.refereshTokenLife,
                      }
                    );

                    res.status(201).json({
                      message: "User signed up and logged in!",
                      access_token: access_token,
                      referesh_token: referesh_token,
                      username: Newuser.name,
                      userId: Newuser._id,
                      isAdmin: Newuser.isAdmin,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            } else {
              const access_token = jwt.sign(
                { email: email },
                api_key.accessToken,
                {
                  algorithm: "HS256",
                  expiresIn: api_key.accessTokenLife,
                }
              );

              const referesh_token = jwt.sign(
                { email: email },
                api_key.refereshToken,
                {
                  algorithm: "HS256",
                  expiresIn: api_key.refereshTokenLife,
                }
              );

              res.status(201).json({
                message: "User logged in!",
                access_token: access_token,
                referesh_token: referesh_token,
                username: user.name,
                userId: user._id,
                isAdmin: user.isAdmin,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
