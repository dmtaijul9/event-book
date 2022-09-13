const User = require("../../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: async (args) => {
    try {
      const existedUser = await User.findOne({ email: args.userInput.email });

      if (existedUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();

      return { ...result._doc, password: null, _id: result._doc.id };
    } catch (err) {
      throw err;
    }
  },
};
