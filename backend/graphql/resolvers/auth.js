const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    try {
      const existedUser = await User.findOne({ email: args.userInput.email });

      if (existedUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        name: args.userInput.name || "User",
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();

      return { ...result._doc, password: null, _id: result._doc._id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    const isEqualPass = await bcrypt.compare(password, user.password);
    if (!isEqualPass) {
      throw new Error("Password does not match!");
    }
    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      "jsonWebTokenSecret",
      {
        expiresIn: "1h",
      }
    );

    return {
      userId: user.id,
      token,
      tokenExpiration: 1,
    };
  },
};
